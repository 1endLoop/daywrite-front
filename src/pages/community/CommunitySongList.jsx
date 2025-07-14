import React from 'react';
import S from './community.songlist.style';

const dummyData = [
  {
    id: 1,
    music: 'Hawaiian Roller Coaster Ride',
    artist: 'Lilo & Stitch',
    album: 'Kamehameha Schools Children’s Chor',
    like: 14,
  },
  {
    id: 2,
    music: 'Hawaiian Roller Coaster Ride',
    artist: 'Lilo & Stitch',
    album: 'Kamehameha Schools Children’s Chor',
    like: 14,
  },
  {
    id: 3,
    music: 'Hawaiian Roller Coaster Ride',
    artist: 'Lilo & Stitch',
    album: 'Kamehameha Schools Children’s Chor',
    like: 14,
  },
  {
    id: 4,
    music: 'Hawaiian Roller Coaster Ride',
    artist: 'Lilo & Stitch',
    album: 'Kamehameha Schools Children’s Chor',
    like: 14,
  }

];

const CommunitySongList = () => {
  return (
    <S.OutsideWrapper>
      <S.Left >
        <img src="" alt=""  className='pl'/>
      </S.Left>
      <S.Right>
        <S.top>
          <div>
            <h2 className="collection-title">사랑이란 뭘까..?</h2>
            <p className="collection-author">준호</p>
          </div>
          <div className='icon'>
            <img src="" alt="좋아요 아이콘" />
            <img src="" alt="팔로우 아이콘" />
            <img src="" alt="공유하기 아이콘" />
          </div>
        </S.top>

        <S.MusicList>
          <S.MusicDivision>
            <p>No.</p>
            <p>앨범</p>
            <p>곡명 / 앨범명</p>
            <p>아티스트명</p>
            <p>좋아요 수</p>
            <p>재생</p>
          </S.MusicDivision>


          <S.Music>
            {dummyData.map((item, index) => (
              <S.MusicCard key={item.id}>
                <div className="num"><p>{index + 1}</p></div>
                <div className="album"><img src="/assets/images/sample_album.jpg" alt="앨범 이미지" /></div>
                <div className="singName">
                  <p>{item.music}</p>
                  <span>{item.album}</span>
                </div>
                <div className="artistName"><p>{item.artist}</p></div>
                <div className="like">
                  <img src="/assets/images/icons/like.png" alt="좋아요 아이콘" />
                  <p>{item.like}</p>
                </div>
                <div className="play">
                  <img src="/assets/images/icons/prev.svg" alt="이전 곡" /> 
                  <img src="" alt="재생" />
                  <img src="" alt="다음 곡" />
                </div>
              </S.MusicCard>
            ))}
          </S.Music>

        </S.MusicList>
      </S.Right>
    </S.OutsideWrapper>
  );
};

export default CommunitySongList;

