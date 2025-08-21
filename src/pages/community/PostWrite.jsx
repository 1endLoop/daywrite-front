import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./post.write.style";
import PostTypeToggle from "../../components/button/PostTypeToggle"; 

const PostWrite = () => {
  const navigate = useNavigate();
  const [isOriginal, setIsOriginal] = useState(true);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
    musicTitle: "",
    musicArtist: "",
    isPublic: true,
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" && name === "isPublic" ? value === "true" : value,
    }));
  };

  const validate = () => {
    if (!form.title.trim()) {
      alert(isOriginal ? "글 제목을 입력해 주세요." : "책 제목을 입력해 주세요.");
      return false;
    }
    if (!isOriginal && !form.author.trim()) {
      alert("저자를 입력해 주세요. (참조글은 저자 필수)");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("임시: 유효성 통과! 저장 로직을 연결해 주세요.");
  };

  const onTempSave = () => {
    alert("임시저장! (로컬/서버 로직을 연결해 주세요)");
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
          <S.Button type="button" onClick={onTempSave}>임시저장</S.Button>
          <S.Button type="submit" form="postWriteForm" primary>
            저장
          </S.Button>
        </S.ButtonGroup>
      </S.TopBar>

      <S.TopRow>
        <PostTypeToggle isOriginal={isOriginal} onToggle={setIsOriginal} />
      </S.TopRow>

      <S.Form id="postWriteForm" onSubmit={onSubmit}>
        <S.RowGroup>
          <S.HalfRow>
            <S.Label>{titleLabel} *</S.Label>
            <S.Input
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder={titlePlaceholder}
              required
            />
          </S.HalfRow>

          <S.HalfRow>
            <S.Label>
              저자{isOriginal ? "" : " *"}
            </S.Label>
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
          <S.TextArea
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="글의 내용을 입력해 주세요"
          />
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
              <input
                type="radio"
                name="isPublic"
                value="true"
                checked={form.isPublic === true}
                onChange={onChange}
              /> 공개
            </label>
            <label>
              <input
                type="radio"
                name="isPublic"
                value="false"
                checked={form.isPublic === false}
                onChange={onChange}
              /> 비공개
            </label>
          </S.CheckGroup>
        </S.Row>
      </S.Form>
    </S.Container>
  );
};

export default PostWrite;