import React from "react";
import S from "./bookmark.typed.style";

const BookmarkDetail = ({ onClose, data }) => {
  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Modal>
        <S.Header>
          책 정보
          <S.CloseBtn onClick={onClose}>×</S.CloseBtn>
        </S.Header>
        <S.Divider />
        <S.Content>
          <S.CoverImage src={data.coverUrl} alt={data.title} />
          <S.InfoBox>
            <S.Title>{data.title}</S.Title>
            <S.Meta>
              <span>
                <label>저자</label> {data.author}
              </span>
              <span>
                <label>출판</label> {data.publisher}
              </span>
              <span>
                <label>출간</label> {data.publishedDate}
              </span>
            </S.Meta>
            <S.Description>{data.content}</S.Description>
          </S.InfoBox>
        </S.Content>
      </S.Modal>
    </>
  );
};

export default BookmarkDetail;
