// src/pages/community/PostWrite.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import S from "./post.write.style";
import PostTypeToggle from "../../components/button/PostTypeToggle";
import { createPost } from "../../api/communityApi";

const PostWrite = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user?.currentUser, shallowEqual);
  const userId = currentUser?._id || currentUser?.id || currentUser?.userId || null;
  const nickname = currentUser?.nickname || currentUser?.name || currentUser?.displayName || "익명";
  const profileImg = currentUser?.profileImageUrl || "/assets/images/profiles/profile.jpg";
  
  // 글 타입: 창작글(true) / 참조글(false)
  const [isOriginal, setIsOriginal] = useState(true);

  const [form, setForm] = useState({
    title: "",
    author: "", // 참조글일 때 책 저자
    content: "",
    musicTitle: "",
    musicArtist: "",
    isPublic: true, // 공개 기본값
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" && name === "isPublic" ? value === "true" : value,
    }));
  };

  const validate = (isDraft) => {
    // 임시저장은 최소 검증: 제목만 체크, 참조글은 저자 생략 가능 (원하면 강화 가능)
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
      const payload = buildPayload("published");
      await createPost(payload);

      // 이동 규칙:
      // 공개/저장 → 전체글 & 내글(저장) 모두 노출되지만, UX상 어디로 보낼 지는 정책에 따라.
      // 여기서는 "내가 쓴 글(전체보기 탭)"로 이동.
      navigate("/community/my", { replace: true });
    } catch (err) {
      console.error(err);
      alert("저장 중 오류가 발생했어요.");
    }
  };

  // 임시저장
  const onTempSave = async () => {
    if (!validate(true)) return;
    try {
      const payload = buildPayload("draft");
      await createPost(payload);

      // 임시저장은 "내가 쓴 글(임시저장 탭)"로 이동
      navigate("/community/mine?tab=temp", { replace: true });
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
          <S.Title>나만의 필사글 작성</S.Title>
        </S.TitleGroup>

        <S.ButtonGroup>
          <S.Button type="button" onClick={onTempSave}>
            임시저장
          </S.Button>
          <S.Button type="submit" form="postWriteForm" $primary>
            저장
          </S.Button>
        </S.ButtonGroup>
      </S.TopBar>

      {/* 타입 토글 */}
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
            <S.Label>저자{isOriginal ? " (창작글은 비활성)" : " *"}</S.Label>
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
              placeholder="함께 들으면 좋을 음악 제목"
            />
          </S.HalfRow>
          <S.HalfRow>
            <S.Label>가수</S.Label>
            <S.Input
              name="musicArtist"
              value={form.musicArtist}
              onChange={onChange}
              placeholder="가수명을 입력해 주세요"
            />
          </S.HalfRow>
        </S.RowGroup>

        <S.Row>
          <S.Label>커뮤니티 공개 여부</S.Label>
          <S.CheckGroup>
            <label>
              <input type="radio" name="isPublic" value="true" checked={form.isPublic === true} onChange={onChange} />{" "}
              공개
            </label>
            <label>
              <input type="radio" name="isPublic" value="false" checked={form.isPublic === false} onChange={onChange} />{" "}
              비공개
            </label>
          </S.CheckGroup>
        </S.Row>
      </S.Form>
    </S.Container>
  );
};

export default PostWrite;
