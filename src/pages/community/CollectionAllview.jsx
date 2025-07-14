import React from 'react';
import S from './collectionAllviewStyle';

// const dummyData = [
//     {
//         id: 1,
//         title: 'Hollywood',
//         author: '김정치마',
//         imageUrl: '/images/hollywood.png',
//         liked: true,
//     },
//     {
//         id: 2,
//         title: 'Min',
//         author: '김정치마',
//         imageUrl: '/images/min.png',
//         liked: false,
//     },
//     // 더미 데이터 추가
// ];

const CollectionAllview = () => {
    return (
        <div>
            <S.AllViewTitle>
                <h2>Played</h2>
            </S.AllViewTitle>
            <S.AllViewWrapper>
                {[...Array(30)].map((_, i) => (
                <S.AllViewBox key={i}>
                    <img src="" alt="" className='folderImg'/>
                    <div className='ViewBoxTitle'>
                        <strong>폴더 이름</strong>
                        <p>제목</p>
                        <img src="" alt="" className='heart'/>
                    </div>
                </S.AllViewBox>
                ))}
            </S.AllViewWrapper>
        </div>
    );
};

export default CollectionAllview;

    // {dummyData.map(item => (
    //     <S.AllViewBox key={item.id}>
    //         <img src={item.imageUrl} alt={item.title} className='folderImg' />
    //         <div className='ViewBoxTitle'>
    //             <strong>{item.title}</strong>
    //             <p>{item.author}</p>
    //             <img
    //                 src={item.liked ? '/images/heart-filled.png' : '/images/heart-empty.png'}
    //                 alt='heart'
    //                 className='heart'
    //             />
    //         </div>
    //     </S.AllViewBox>
    // ))}