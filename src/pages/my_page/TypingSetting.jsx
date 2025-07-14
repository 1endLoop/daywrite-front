import React, { useState } from 'react';
import S from './style';
import { useBackground } from '../../contexts/BackgroundContext'; // ✅ Context import

const TypingSetting = () => {
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);

  const [images, setImages] = useState([
    '/assets/images/background/snow.jpg',
    '/assets/images/background/sea1.jpg',
  ]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [confirmedImage, setConfirmedImage] = useState(null);

  const { setBackgroundImage } = useBackground(); // ✅ Context 함수 사용

  // 이미지 삭제
  const handleDeleteImage = () => {
    if (selectedImage === null || selectedImage >= images.length) return;

    const newImages = images.filter((_, idx) => idx !== selectedImage);
    setImages(newImages);

    if (newImages.length === 0) {
      setSelectedImage(null);
      setConfirmedImage(null);
      setBackgroundImage(null); // ✅ 배경 초기화
    } else {
      const newSelected = Math.max(0, selectedImage - 1);
      setSelectedImage(newSelected);

      if (confirmedImage === selectedImage) {
        setConfirmedImage(null);
        setBackgroundImage(null); // ✅ 배경 초기화
      } else if (confirmedImage > selectedImage) {
        setConfirmedImage((prev) => prev - 1);
      }
    }
  };

  // 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImages((prev) => {
      const updated = [...prev, imageUrl];
      setSelectedImage(updated.length - 1);
      return updated;
    });
  };

  return (
    <S.TypingSettingContainer>
      <S.TypingSettingTitle>타이핑 화면 세팅</S.TypingSettingTitle>

      <S.PreviewText size={fontSize} weight={fontWeight}>
        안녕하세요. daywrite입니다.
      </S.PreviewText>

      <S.SliderRow>
        <S.Label>FONT SIZE</S.Label>
        <S.Slider>
          <S.ControlButton onClick={() => setFontSize((s) => Math.max(s - 1, 10))}>−</S.ControlButton>
          <span>{fontSize} pt</span>
          <S.ControlButton onClick={() => setFontSize((s) => s + 1)}>＋</S.ControlButton>
        </S.Slider>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>FONT WEIGHT</S.Label>
        <S.Slider>
          <S.ControlButton onClick={() => setFontWeight((w) => Math.max(w - 100, 100))}>−</S.ControlButton>
          <span>{fontWeight === 700 ? 'BOLD' : fontWeight}</span>
          <S.ControlButton onClick={() => setFontWeight((w) => Math.min(w + 100, 900))}>＋</S.ControlButton>
        </S.Slider>
      </S.SliderRow>

      <S.BackgroundSection>
        <S.BackgroundHeader>
          <S.Label>BACKGROUND IMAGE</S.Label>

          <S.BackgroundButtonGroup>
            <S.ActionButton
              type="button"
              onClick={() => document.getElementById('upload-image').click()}
            >
              추가하기
            </S.ActionButton>

            <S.VerticalDivider />

            <S.ActionButton
              onClick={handleDeleteImage}
              disabled={selectedImage === null}
            >
              삭제하기
            </S.ActionButton>

            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </S.BackgroundButtonGroup>
        </S.BackgroundHeader>

        <S.ImageGrid>
          {images.map((src, i) => (
            <S.Thumbnail
              key={i}
              src={src}
              selected={i === selectedImage}
              confirmed={i === confirmedImage}
              onClick={() => {
                if (i === selectedImage) {
                  setConfirmedImage(i);
                  setBackgroundImage(src); // ✅ 전역 상태로 반영
                } else {
                  setSelectedImage(i);
                }
              }}
            />
          ))}
        </S.ImageGrid>
      </S.BackgroundSection>
    </S.TypingSettingContainer>
  );
};

export default TypingSetting;




