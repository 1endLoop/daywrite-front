import React from "react";
import { useNavigate } from "react-router-dom";
import S from "./post.write.style";

const PostWrite = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.TopBar>
        <S.TitleGroup>
          <S.Back onClick={() => navigate(-1)}>←</S.Back>
          <S.Title>나만의 필사글 작성</S.Title>
        </S.TitleGroup>

        <S.ButtonGroup>
          <S.Button type="button">임시저장</S.Button>
          <S.Button type="submit" primary>
            저장
          </S.Button>
        </S.ButtonGroup>
      </S.TopBar>

      <S.Form>
        <S.RowGroup>
          <S.HalfRow>
            <S.Label>제목</S.Label>
            <S.Input placeholder="글의 제목을 입력해 주세요" />
          </S.HalfRow>
          <S.HalfRow>
            <S.Label>저자</S.Label>
            <S.Input placeholder="글의 저자를 입력해 주세요 (창작글의 경우 제외)" />
          </S.HalfRow>
        </S.RowGroup>

        <S.Row>
          <S.Label>내용</S.Label>
          <S.TextArea placeholder="글의 내용을 입력해 주세요" />
        </S.Row>

        <S.Row>
          <S.Label>음악</S.Label>
          <S.Input placeholder="함께 들으면 좋을 음악을 선택해 주세요" />
        </S.Row>

        <S.Row>
          <S.Label>커뮤니티 공개 여부</S.Label>
          <S.CheckGroup>
            <label>
              <input type="radio" name="public" defaultChecked /> 공개
            </label>
            <label>
              <input type="radio" name="public" /> 비공개
            </label>
          </S.CheckGroup>
        </S.Row>
      </S.Form>
    </S.Container>
  );
};

export default PostWrite;
