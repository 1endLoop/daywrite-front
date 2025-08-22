import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import S from "./post.write.style";
import PostTypeToggle from "../../components/button/PostTypeToggle";
import { createPost, updatePost } from "../../api/communityApi";

const PostWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 사용자
  const currentUser = useSelector((state) => state.user?.currentUser, shallowEqual);
  const userId = currentUser?._id || currentUser?.id || currentUser?.userId || null;
  const nickname = currentUser?.nickname || currentUser?.name || currentUser?.displayName || "익명";
  const profileImg = currentUser?.profileImageUrl || "/assets/images/profiles/profile.jpg";

  // 수정 모드 여부 + 전달된 post
  const editPost = location.state?.mode === "edit" ? location.state?.post : null;
  const isEdit = !!editPost;
  const editStatus = editPost?.status || "published"; // 'draft' | 'published'

  // 글 타입: 창작글(true) / 참조글(false)
  const [isOriginal, setIsOriginal] = useState(true);

  // 폼 상태
  const [form, setForm] = useState({
    title: "",
    author: "", // 참조글일 때 책 저자 (refAuthor)
    content: "",
    musicTitle: "",
    musicArtist: "",
    isPublic: true,
  });

  // 수정 모드일 때 최초 1회 프리필
  useEffect(() => {
    if (!isEdit || !editPost) return;
    setIsOriginal((editPost.type || "original") === "original");
    setForm({
      title: editPost.title || "",
      author: editPost.refAuthor || "",
      content: editPost.content || "",
      musicTitle: editPost.musicTitle || "",
      musicArtist: editPost.musicArtist || "",
      isPublic: typeof editPost.isPublic === "boolean" ? editPost.isPublic : true,
    });
  }, [isEdit, editPost]);

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" && name === "isPublic" ? value === "true" : value,
    }));
  };

  const validate = (isDraft) => {
    if (!form.title.trim()) {
      alert(isOriginal ? "글 제목을 입력해 주세요." : "책 제목을 입력해 주세요.");
      return false;
    }
    if (!isDraft && !isOriginal && !form.author.trim()) {
      alert("저자를 입력해 주세요. (참조글은 저자 필수)");
      return false;
    }
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      return false;
    }
    return true;
  };

  // 공통 payload 생성
  const buildPayload = (status /* 'published' | 'draft' */) => ({
    userId,
    nickname,
    profileImg,
    type: isOriginal ? "original" : "reference",
    title: form.title.trim(),
    refAuthor: isOriginal ? "" : form.author.trim(),
    content: form.content.trim(),
    musicTitle: form.musicTitle.trim(),
    musicArtist: form.musicArtist.trim(),
    isPublic: !!form.isPublic,
    status,
  });

  // 저장(게시)
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate(false)) return;
    try {
      if (isEdit) {
        // 수정 모드: '저장'은 게시 상태로
        const payload = buildPayload("published");
        await updatePost(editPost._id, payload);
      } else {
        const payload = buildPayload("published");
        await createPost(payload);
      }
      navigate("/community/my", { replace: true }); // 전체글 탭으로
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했어요.");
    }
  };

  // 임시저장
  const onTempSave = async () => {
    if (!validate(true)) return;
    try {
      if (isEdit) {
        // 수정 모드: '임시저장'은 draft 상태 유지/변경
        const payload = buildPayload("draft");
        await updatePost(editPost._id, payload);
      } else {
        const payload = buildPayload("draft");
        await createPost(payload);
      }
      navigate("/community/my?tab=temp", { replace: true }); // 임시저장 탭으로
    } catch (err) {
      console.error(err);
      alert("임시저장 중 오류가 발생했어요.");
    }
  };

  const titleLabel = isOriginal ? "제목" : "책 제목";
  const titlePlaceholder = isOriginal ? "글의 제목을 입력해 주세요" : "책 제목을 입력해 주세요";

  return (
    <S.Container>
      <S.TopBar>
        <S.TitleGroup>
          <S.Back onClick={() => navigate(-1)}>←</S.Back>
          <S.Title>{isEdit ? "나만의 필사글 수정" : "나만의 필사글 작성"}</S.Title>
        </S.TitleGroup>

        <S.ButtonGroup>
          {/* 수정 페이지에서는 임시저장 버튼 숨김 */}
          {!isEdit && (
            <S.Button type="button" onClick={onTempSave}>
              임시저장
            </S.Button>
          )}

          {/* 저장 버튼 라벨을 수정 모드에서는 '수정'으로 표기 */}
          <S.Button type="submit" form="postWriteForm" $primary>
            {isEdit ? "수정" : "저장"}
          </S.Button>
        </S.ButtonGroup>
      </S.TopBar>

      {/* 타입 토글 (수정 시에도 변경 가능. 변경 못 하게 하려면 disabled 처리하면 됨) */}
      <S.TopRow>
        <PostTypeToggle isOriginal={isOriginal} onToggle={setIsOriginal} />
      </S.TopRow>

      <S.Form id="postWriteForm" onSubmit={onSubmit}>
        <S.RowGroup>
          <S.HalfRow>
            <S.Label>{titleLabel} *</S.Label>
            <S.Input name="title" value={form.title} onChange={onChange} placeholder={titlePlaceholder} required />
          </S.HalfRow>
          <S.HalfRow>
            <S.Label>저자{isOriginal ? "" : " *"}</S.Label>
            <S.Input
              name="author"
              value={form.author}
              onChange={onChange}
              placeholder={isOriginal ? "창작글은 저자를 입력할 수 없어요" : "저자를 입력해 주세요"}
              disabled={isOriginal}
              required={!isOriginal}
            />
          </S.HalfRow>
        </S.RowGroup>

        <S.Row>
          <S.Label>내용</S.Label>
          <S.TextArea name="content" value={form.content} onChange={onChange} placeholder="글의 내용을 입력해 주세요" />
        </S.Row>

        <S.RowGroup>
          <S.HalfRow>
            <S.Label>음악 제목</S.Label>
            <S.Input
              name="musicTitle"
              value={form.musicTitle}
              onChange={onChange}
              placeholder="함께 들으면 좋을 음악의 제목을 입력해 주세요"
            />
          </S.HalfRow>
          <S.HalfRow>
            <S.Label>아티스트</S.Label>
            <S.Input
              name="musicArtist"
              value={form.musicArtist}
              onChange={onChange}
              placeholder="아티스트명을 입력해 주세요"
            />
          </S.HalfRow>
        </S.RowGroup>

        <S.Row>
          <S.Label>커뮤니티 공개 여부</S.Label>
          <S.CheckGroup>
            <label>
              <input type="radio" name="isPublic" value="true" checked={form.isPublic === true} onChange={onChange} /> 공개
            </label>
            <label>
              <input type="radio" name="isPublic" value="false" checked={form.isPublic === false} onChange={onChange} /> 비공개
            </label>
          </S.CheckGroup>
        </S.Row>
      </S.Form>
    </S.Container>
  );
};

export default PostWrite;