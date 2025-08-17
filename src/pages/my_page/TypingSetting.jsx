// src/components/TypingSetting/TypingSetting.jsx
import React, { useState, useEffect, useMemo } from 'react';
import S from './style';
import { useBackground } from '../../contexts/BackgroundContext';
import { useSelector } from 'react-redux';

const TypingSetting = () => {
  const { setBackgroundImage } = useBackground();
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

  // 사용자/부트 상태
  const { currentUser, authChecked } = useSelector((s) => s.user);
  const userId = currentUser?._id ?? 'guest';

  // 계정별 키
  const nsKey = useMemo(() => (k) => `pref:${userId}:${k}`, [userId]);
  const myListKey = useMemo(() => nsKey('myBackgrounds'), [nsKey]);
  const selectedPathKey = useMemo(() => nsKey('selectedImagePath'), [nsKey]); // ★ 선택 유지 키

  // 경로 정규화: "/uploads/a.jpg" → "uploads/a.jpg"
  const norm = (p) => (p?.startsWith('/') ? p.slice(1) : p);

  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);

  const [images, setImages] = useState([]);       // 화면에 보여줄 목록(계정 기준, path는 norm됨)
  const [selectedImage, setSelectedImage] = useState(null);   // 하이라이트만
  const [confirmedImage, setConfirmedImage] = useState(null); // 실제 적용 대상

  // 폰트 로드/저장 (authChecked 이후)
  useEffect(() => {
    if (!authChecked) return;
    const s = localStorage.getItem(nsKey('fontSize'));
    const w = localStorage.getItem(nsKey('fontWeight'));
    if (s) setFontSize(Number(s));
    if (w) setFontWeight(Number(w));
  }, [authChecked, nsKey]);

  useEffect(() => {
    localStorage.setItem(nsKey('fontSize'), String(fontSize));
  }, [fontSize, nsKey]);

  useEffect(() => {
    localStorage.setItem(nsKey('fontWeight'), String(fontWeight));
  }, [fontWeight, nsKey]);

  // 목록 로드 + 필터 + 선택/확정 복원
  useEffect(() => {
    if (!authChecked) return;
    let cancelled = false;

    fetch(`${API_URL}/api/upload/background/list`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        // 서버 목록 정규화
        const all = (data.images || []).map((img) => ({ ...img, path: norm(img.path) }));
        const mine = JSON.parse(localStorage.getItem(myListKey) || '[]'); // ["uploads/..."]

        // 저장된 경로(확정/선택) 읽기
        const savedConfirmedRaw = localStorage.getItem(nsKey('confirmedImagePath'));
        const savedConfirmed = savedConfirmedRaw ? norm(savedConfirmedRaw) : null;

        const savedSelectedRaw = localStorage.getItem(selectedPathKey);
        const savedSelected = savedSelectedRaw ? norm(savedSelectedRaw) : null;

        // 내 목록이 있으면 필터, 없으면 빈 목록(계정 섞임 방지)
        let baseList = mine.length > 0 ? all.filter((img) => mine.includes(img.path)) : [];

        // 저장된 확정 경로가 있는데 내 목록엔 없고 서버엔 있으면 내 목록에 자동 포함
        if (savedConfirmed && !mine.includes(savedConfirmed) && all.some((img) => img.path === savedConfirmed)) {
          const updatedMine = [...mine, savedConfirmed];
          localStorage.setItem(myListKey, JSON.stringify(updatedMine));
          baseList = all.filter((img) => updatedMine.includes(img.path));
        }

        setImages(baseList);

        // ✅ 확정(배경) 복원: 목록에 있으면 index로 매핑, 없으면 손대지 않음(배경 유지)
        if (savedConfirmed) {
          const cIdx = baseList.findIndex((img) => img.path === savedConfirmed);
          if (cIdx >= 0) setConfirmedImage(cIdx);
        }

        // ✅ 선택(하이라이트) 복원: 1순위 savedSelected, 2순위 savedConfirmed
        let sIdx = null;
        if (savedSelected) {
          const idx = baseList.findIndex((img) => img.path === savedSelected);
          if (idx >= 0) sIdx = idx;
        }
        if (sIdx === null && savedConfirmed) {
          const idx = baseList.findIndex((img) => img.path === savedConfirmed);
          if (idx >= 0) sIdx = idx;
        }
        setSelectedImage(sIdx); // 자동 0번 선택 절대 금지
      })
      .catch((err) => console.error('이미지 목록 가져오기 실패:', err));

    return () => { cancelled = true; };
  }, [authChecked, API_URL, nsKey, myListKey, selectedPathKey, userId]);

  // 배경 적용/저장: 확정 시에만 반영 (초기화 금지)
  useEffect(() => {
    if (confirmedImage !== null && images[confirmedImage]) {
      const n = images[confirmedImage].path; // 이미 norm()된 값
      setBackgroundImage(`${API_URL}/${n}`);
      localStorage.setItem(nsKey('confirmedImagePath'), n);
    }
    // confirmedImage === null일 땐 손대지 않음 → 진입 시 기본으로 돌아가는 현상 방지
  }, [confirmedImage, images, API_URL, nsKey, setBackgroundImage]);

  // 업로드: 내 목록에 추가(정규화 후) + 선택/확정/스토리지 동기화
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('image', file);

    fetch(`${API_URL}/api/upload/background`, { method: 'POST', body: fd })
      .then((res) => res.json())
      .then((data) => {
        const raw = data?.imageUrl;
        if (!raw) return;

        const n = norm(raw);
        const mine = JSON.parse(localStorage.getItem(myListKey) || '[]');
        if (!mine.includes(n)) {
          localStorage.setItem(myListKey, JSON.stringify([...mine, n]));
        }

        setImages((prev) => {
          const updated = [...prev, { path: n }];
          const idx = updated.length - 1;
          setSelectedImage(idx);
          setConfirmedImage(idx);
          localStorage.setItem(selectedPathKey, n);            // ★ 선택 유지
          // confirmedImagePath는 useEffect에서 저장됨
          return updated;
        });
      })
      .catch((err) => console.error('이미지 업로드 실패:', err));
  };

  // 삭제: 내 목록에서도 제거 + 선택/확정/스토리지 동기화
  const handleDeleteImage = () => {
    if (selectedImage === null || selectedImage >= images.length) return;

    const n = images[selectedImage].path; // norm된 값
    const filename = n.split('/').pop();

    fetch(`${API_URL}/api/upload/background/${encodeURIComponent(filename)}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        const mine = JSON.parse(localStorage.getItem(myListKey) || '[]');
        localStorage.setItem(myListKey, JSON.stringify(mine.filter((p) => p !== n)));

        const deletedIndex = selectedImage;
        const arr = images.filter((_, i) => i !== deletedIndex);
        setImages(arr);

        // 선택/확정 인덱스 보정
        // 1) 선택이 지워졌을 때
        if (arr.length === 0) {
          setSelectedImage(null);
          setConfirmedImage(null);
          setBackgroundImage(null);
          localStorage.removeItem(nsKey('confirmedImagePath'));
          localStorage.removeItem(selectedPathKey);            // ★ 선택 경로 제거
        } else {
          // 선택이 지워졌으면 이전 아이템으로 이동
          let newSel = selectedImage;
          if (deletedIndex === selectedImage) {
            newSel = Math.max(0, selectedImage - 1);
            setSelectedImage(newSel);
            localStorage.setItem(selectedPathKey, arr[newSel].path); // ★ 선택 경로 갱신
          } else if (deletedIndex < selectedImage) {
            // 선택보다 앞이 지워지면 인덱스 -1
            setSelectedImage((prev) => {
              const next = prev - 1;
              localStorage.setItem(selectedPathKey, arr[next].path);
              return next;
            });
          }

          // 확정이 지워졌을 때
          if (confirmedImage === deletedIndex) {
            setConfirmedImage(null);
            setBackgroundImage(null);
            localStorage.removeItem(nsKey('confirmedImagePath'));
          } else if (confirmedImage > deletedIndex) {
            setConfirmedImage((prev) => prev - 1);
          }
        }
      })
      .catch((err) => console.error('이미지 삭제 실패:', err));
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
            <S.ActionButton onClick={() => document.getElementById('upload-image').click()}>
              추가하기
            </S.ActionButton>

            <S.VerticalDivider />

            <S.ActionButton onClick={handleDeleteImage} disabled={selectedImage === null}>
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
          {images.map((img, i) => {
            const srcPath = img?.path ? `${API_URL}/${img.path}` : undefined; // 이미 norm됨
            return (
              <S.Thumbnail
                key={img._id || i}
                src={srcPath}
                $selected={i === selectedImage}
                $confirmed={i === confirmedImage}
                onClick={() => {
                  if (i === selectedImage) {
                    // 두 번 클릭 → 확정
                    setConfirmedImage(i);
                    // 확정되면 내 목록에도 포함(중복 방지)
                    const mine = JSON.parse(localStorage.getItem(myListKey) || '[]');
                    if (img?.path && !mine.includes(img.path)) {
                      localStorage.setItem(myListKey, JSON.stringify([...mine, img.path]));
                    }
                  } else {
                    // 단일 클릭 → 선택만 (저장)
                    setSelectedImage(i);
                    if (img?.path) localStorage.setItem(selectedPathKey, img.path); // ★ 선택 유지
                  }
                }}
              />
            );
          })}
        </S.ImageGrid>
      </S.BackgroundSection>
    </S.TypingSettingContainer>
  );
};

export default TypingSetting;

