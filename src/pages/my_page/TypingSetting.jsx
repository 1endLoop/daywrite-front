// TypingSetting.jsx
import React, { useState, useEffect } from 'react';
import S from './style';
import { useBackground } from '../../contexts/BackgroundContext';

const TypingSetting = () => {
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [confirmedImage, setConfirmedImage] = useState(null);

  const { setBackgroundImage } = useBackground();

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  // ✅ 폰트 설정 불러오기
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    const savedFontWeight = localStorage.getItem("fontWeight");
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedFontWeight) setFontWeight(Number(savedFontWeight));
  }, []);

  // ✅ 폰트 설정 저장
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("fontWeight", fontWeight.toString());
  }, [fontWeight]);

  // ✅ 이미지 목록 + 저장된 path로 선택 복원
  useEffect(() => {
    fetch(`${API_URL}/api/upload/background/list`)
      .then(res => res.json())
      .then(data => {
        const imgList = data.images || [];
        setImages(imgList);

        const savedPath = localStorage.getItem('confirmedImagePath');
        const foundIndex = imgList.findIndex(img =>
          img.path === savedPath || `/${img.path}` === savedPath
        );

        if (foundIndex >= 0) {
          setSelectedImage(foundIndex);
          setConfirmedImage(foundIndex);
        } else if (imgList.length > 0) {
          setSelectedImage(0);
          setConfirmedImage(0);
        }
      })
      .catch(err => console.error("이미지 목록 가져오기 실패:", err));
  }, [API_URL]);

  // ✅ 선택한 이미지 적용 + 로컬 저장
  useEffect(() => {
    if (confirmedImage !== null && images[confirmedImage]) {
      const imgPath = images[confirmedImage].path;
      const fullPath = `${API_URL}/${imgPath.startsWith('/') ? imgPath.slice(1) : imgPath}`;
      setBackgroundImage(fullPath);

      localStorage.setItem('confirmedImagePath', imgPath);
    }
  }, [confirmedImage, images, setBackgroundImage, API_URL]);

  // ✅ 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    fetch(`${API_URL}/api/upload/background`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.imageUrl) {
          setImages(prev => {
            const updated = [...prev, { path: data.imageUrl }];
            const newIndex = updated.length - 1;
            setSelectedImage(newIndex);
            setConfirmedImage(newIndex);
            return updated;
          });
        }
      })
      .catch(err => console.error("이미지 업로드 실패:", err));
  };

  // ✅ 삭제
  const handleDeleteImage = () => {
    if (selectedImage === null || selectedImage >= images.length) return;

    const imageToDelete = images[selectedImage];
    const filename = imageToDelete.path.split("/").pop();

    fetch(`${API_URL}/api/upload/background/${encodeURIComponent(filename)}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        const newImages = images.filter((_, idx) => idx !== selectedImage);
        setImages(newImages);

        if (newImages.length === 0) {
          setSelectedImage(null);
          setConfirmedImage(null);
          setBackgroundImage(null);
          localStorage.removeItem('confirmedImagePath');
        } else {
          const newSelected = Math.max(0, selectedImage - 1);
          setSelectedImage(newSelected);

          if (confirmedImage === selectedImage) {
            setConfirmedImage(null);
            setBackgroundImage(null);
            localStorage.removeItem('confirmedImagePath');
          } else if (confirmedImage > selectedImage) {
            setConfirmedImage(prev => prev - 1);
          }
        }
      })
      .catch(err => console.error("이미지 삭제 실패:", err));
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
          <S.ControlButton onClick={() => setFontSize(s => Math.max(s - 1, 10))}>−</S.ControlButton>
          <span>{fontSize} pt</span>
          <S.ControlButton onClick={() => setFontSize(s => s + 1)}>＋</S.ControlButton>
        </S.Slider>
      </S.SliderRow>

      <S.SliderRow>
        <S.Label>FONT WEIGHT</S.Label>
        <S.Slider>
          <S.ControlButton onClick={() => setFontWeight(w => Math.max(w - 100, 100))}>−</S.ControlButton>
          <span>{fontWeight === 700 ? 'BOLD' : fontWeight}</span>
          <S.ControlButton onClick={() => setFontWeight(w => Math.min(w + 100, 900))}>＋</S.ControlButton>
        </S.Slider>
      </S.SliderRow>

      <S.BackgroundSection>
        <S.BackgroundHeader>
          <S.Label>BACKGROUND IMAGE</S.Label>

          <S.BackgroundButtonGroup>
            <S.ActionButton onClick={() => document.getElementById('upload-image').click()}>
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
          {images.map((img, i) => (
            <S.Thumbnail
              key={img._id || i}
              src={`${API_URL}/${img.path.startsWith('/') ? img.path.slice(1) : img.path}`}
              $selected={i === selectedImage}
              $confirmed={i === confirmedImage}
              onClick={() => {
                if (i === selectedImage) {
                  setConfirmedImage(i);
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




