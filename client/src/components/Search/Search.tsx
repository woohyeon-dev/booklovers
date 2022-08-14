import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultType } from '../../types/search';
import { SearchForm, SearchInfo, SearchResult, Pagination } from '@components';

const Search = () => {
  const [searchWord, setSearchWord] = useState('');
  const [totalCnt, setTotalCnt] = useState(0);
  const [searchResult, setSearchResult] = useState<Array<SearchResultType>>([]);
  const [start, setStart] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // [
  //   {
  //     title: '청년 붓다 (바람과 사자와 연꽃의 노래)',
  //     link: 'https://search.shopping.naver.com/book/catalog/33179957625',
  //     image: 'https://shopping-phinf.pstatic.net/main_3317995/33179957625.20220630094625.jpg',
  //     author: '남경아',
  //     discount: '17820',
  //     publisher: '북드라망',
  //     pubdate: '20220630',
  //     isbn: '9791192128146',
  //     description:
  //       '“‘붓다’가 번개라면 ‘청년’은 피뢰침이었다” \n- 청년의 활기, 청년의 질문, 청년의 열정으로 이른 완벽한 자유와 해방을 만난다!\n\n이름은 숱하게 들어봤지만 접근하기는 어려웠던, 혹은 접근할 엄두도 내지 못했던 고전들을 ‘지금, 여기’로 다시 불러내어 현재 삶에 생생한 내비게이션으로 삼게 하는 고전평론가 고미숙이 쓴 붓다 평전. \n초기경전, 그중에서도 『숫타니파타』를 동반자로 삼아 청년 붓다의 여정과 사상을 기록한 이 책은 붓다의 깨달음에 ‘청춘’이라는 시점이 중요하다는 데서 출발했다. 지금으로부터 약 2,600년 전, 한 청년 구도자가 어떻게 자신을 얽어매고 있는 존재의 속박으로부터 탈출해서 바람처럼 사자처럼 연꽃처럼 살아갈 수 있게 되었는지, 그의 삶에서 우리는 어떻게 자유와 당당함, 청정함을 배울 수 있을지가 저자 특유의 명쾌한 문체로 담겨 있다.\n특히 저자는 불안과 공허에 사로잡힌 오늘의 청년들에게 스승 붓다와의 만남이 꼭 필요하다고 말한다. 책제목 ‘청년 붓다’에는 청년기에 깨달은 붓다의 사상이 여든에 생을 마감할 때까지 늘 푸르렀다는 것, 하여 “붓다는 청년이다”라는 의미와 “우리 시대의 청년들에게는 붓다가 필요하다”는 의미가 함께 담겨 있다.',
  //   },
  //   {
  //     title: '칼의 노래 (김훈 장편소설)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32485010628',
  //     image: 'https://shopping-phinf.pstatic.net/main_3248501/32485010628.20220527043811.jpg',
  //     author: '김훈',
  //     discount: '12600',
  //     publisher: '문학동네',
  //     pubdate: '20120105',
  //     isbn: '9788954617246',
  //     description:
  //       '4백 년 전의 이순신을 다시 만나다!\n\n2001년 동인문학상을 수상한 김훈의 소설 『칼의 노래』. 한 국가의 운명을 짊어진 당대의 영웅이자, 정치 모략에 희생되어 장렬히 전사한 명장 이순신의 생애를 그려냈다. 작가는 시대의 명장 이순신뿐만 아니라, 한 인간으로서의 이순신을 함께 표현해내며 사회 안에서 한 개인이 가질 수 있는 삶의 태도에 대해 이야기한다. 삶과 죽음이 엇갈리는 전장에서 영웅이면서 한 인간이었던 이순신의 모습을 엿볼 수 있다. 또한 공동체와 역사에 책임을 져야 할 위치에 선 이들이 지녀야 할 윤리, 문(文)의 복잡함에 대별되는 무(武)의 단순미, 4백 년이라는 시간 속에서도 달라진 바 없는 한국 문화의 혼미한 정체성을 미학적으로 다루고 있다.\n\n▶ 이 책은 2001년에 출간된 〈칼의 노래〉의 개정판입니다.',
  //   },
  //   {
  //     title: '칼의 노래 (김훈 장편소설)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32463532908',
  //     image: 'https://shopping-phinf.pstatic.net/main_3246353/32463532908.20220527022822.jpg',
  //     author: '김훈',
  //     discount: '12600',
  //     publisher: '문학동네',
  //     pubdate: '20140115',
  //     isbn: '9788954623360',
  //     description:
  //       '인간 이순신의 모습을 그린 수작!\n\n지난 20년간 문학동네를 통해 독자와 만나온 빛나는 작품들을 새롭게 선보이는 「문학동네 한국문학전집」 제14권 『칼의 노래』. 21세기 한국문학의 정전을 완성하고자 구성한 「문학동네 한국문학전집」의 열네 번째 작품은 한국문학사에서 대체 불가능한 작가로 자리매김한 작가 김훈의 역사소설로 전쟁터에서 명예롭게 죽고자 하는 무인 이순신의 인간적인 고뇌를 사실적으로 그려냈다.\n\n조선의 명장 이순신이 일인칭 서술자로 등장해 죽기를 각오하고 전장으로 나아간 자신의 이야기를 들려주는 형식으로 구성되었다. 임금의 명을 거부했다는 죄로 옥고를 치르다가 풀려나 삼도수군통제사를 맡게 된 정유년부터 노량해전에서 적탄을 맞아 전사한 이듬해 11월까지의 사건들을 이야기한다. 저자 특유의 남성적 문체로 이순신의 고독하고 불안한 내면을 예리하게 그려낸 이 작품은 프랑스 갈리마르 출판사에서 20세기 이후 가장 뛰어난 문학작품만을 선정 출판하는 ‘전세계 문학총서’로 번역 소개되기도 했다.',
  //   },
  //   {
  //     title: '아무튼, 노래 (노래와 함께 오래된 사람이 된다)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32482705821',
  //     image: 'https://shopping-phinf.pstatic.net/main_3248270/32482705821.20220527022920.jpg',
  //     author: '이슬아',
  //     discount: '10800',
  //     publisher: '위고',
  //     pubdate: '20220425',
  //     isbn: '9791186602713',
  //     description:
  //       '노래와 함께 점점 더 오래된 사람이 된다\n\n“노래방을 장악해보지도 않은 내가 왜 노래에 관한 책을 쓰는가?” 이슬아 작가는 스스로 던진 이 물음에, 생각해보면 몹시 자연스러운 일이라고 답한다. 김연아가 피겨스케이팅에 관한 글을 쓰지 않고 우사인 볼트가 육상에 관한 글을 쓰지 않고 복희가 요리에 관한 글을 쓰지 않듯, 가왕들은 노래에 관한 글을 쓰지 않는다. 그들은 그저 자신이 잘하는 것을 잘하느라 바쁘기 때문이다. \n\n이슬아는 가왕들이 차폭을 정확히 인지한 운전자처럼 두려움 없이 다음 소절로 힘차게 나아가는 모습에 감탄한다. 그런가 하면 잘 못 불렀는데도 좋아죽겠는 노래를 맞닥뜨릴 때마다 음악을, 삶을 처음부터 다시 배우는 기분이 된다. 어느덧 “나를 까먹으며 남의 노래를 보고 듣”게 된다. 『아무튼, 노래』는 아무튼 시리즈 마흔아홉 번째 책이자 이슬아 작가의 열 번째 책으로, 노래에 대한 오랜 사랑의 고백이면서 노래와 함께 점점 더 깨끗하고, 아름답고, 오래된 사람이 되어가는 이야기이다.',
  //   },
  //   {
  //     title: '산책가의 노래 (혼자서 거닐다 마주친 작고 소중한 것들이 건네는 위로)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32857437626',
  //     image: 'https://shopping-phinf.pstatic.net/main_3285743/32857437626.20220614095507.jpg',
  //     author: '이고은',
  //     discount: '13500',
  //     publisher: '잔',
  //     pubdate: '20220613',
  //     isbn: '9791190234887',
  //     description:
  //       '혼자서 거닐다 마주친\n작고 소중한 것들이 건네는 위로\n\n《산책가의 노래》는 작가가 산책을 통해 얻은 위안을 서정적인 글과 감성을 자극하는 수채화로 엮은 첫 에세이집이다. 작가는 연이어 찾아온 감당하기 힘든 슬픔을 안은 채 무작정 한여름 뜨거운 햇빛 속을 걷기 시작했고, 그렇게 세 번의 여름을 혼자 걸으며 발견한 작고 소중한 행복과 그로 인해 서서히 치유되어 가는 마음을 고스란히 담았다.\n\n작가의 담담하고 섬세한 묘사와 솔직한 감정을 읽고 바라보면서 구름 한 점 없는 파란 하늘, 수면 위에서 반짝이는 햇빛, 호수에서 유유히 헤엄치는 물고기, 꽃잎에 맺힌 빗방울, 춤추듯 팔랑거리는 나비, 멀리서 지저귀는 작은 새 등 주변에서 쉽게 만나는 일상의 풍경이 건네는 위안, 그 눈부신 아름다움을 발견할 것이다.',
  //   },
  //   {
  //     title: '김억 작품집 (해파리의 노래(외))',
  //     link: 'https://search.shopping.naver.com/book/catalog/32441009410',
  //     image: 'https://shopping-phinf.pstatic.net/main_3244100/32441009410.20220527025152.jpg',
  //     author: '김희권',
  //     discount: '11700',
  //     publisher: '범우',
  //     pubdate: '20220420',
  //     isbn: '9788963654157',
  //     description:
  //       '한국 초기 시단을 이끈 대표적인 시인\n《김억 작품집》\n\n이 책은 한국 문학사상 최초로 본격적인 근대시를 발표한 시인이자 최초의 근대적인 개인 시집을 출판한 김억의 시집 《민요시집》 《안서시집》 《해파리의 노래》 등에 실린 창작시와 서구시와 한시 등의 번역시, 시집 서문 그리고 시론 및 기타 산문을 한 권으로 엮었다. 김억이 가장 크게 비중은 둔 것은 창작시였다. 그의 창작시에 드러나는 양상은 한국 시의 질적 향상과 연계시켜 생각해볼 수 있다.\n김억은 1918년 이후 활발하게 창작시를 발표하고 또한 그 토대가 되는 시론을 발표하며 초창기 한국 근대시의 한 방향 설정을 가능케 했으며, 1921년 《오뇌의 무도》의 출간 이후 자작시와 번역시 등 모두 20여 권의 시화집을 출간했다. 또한 오산五山과 숭덕崇德학교 등에서 교편을 잡은 것을 필두로 《폐허》 《창조》 《영대》 《조선문단》 《개벽》 《동광》 등에 관여하여 문단 저널리즘 정착에 기여했으며, 직간접적으로 시 창작을 지도하여 다수의 문인들을 길러냈다. \n그는 개성적인 리듬과 자유율, 시어의 아어체(雅語體) 문투를 통해 사적인 정감을 노래함으로써 한국 자유시의 지평을 연 창시자라고 할 수 있다. 또한 번역에 있어서 프랑스 상징파 시인들의 작품을 중심으로 한 해외시의 수입과 수용에 독자적 위치를 차지하며, 시론을 중심으로 한 해외문학이론의 수입과 소개에도 뚜렷한 발자취를 남겼다. 그는 번역이 ‘제2의 창작’이라는 신념 아래 어감 등 우리말 특징에 맞게 번역함으로써 번역을 통한 한국어의 가능성을 드러내기도 했다. 또 한편, 김소월과 나도향 등의 작가를 한국 문단에 소개한 공로자로서 그가 한국 초기 시단과 근대 한국시에 끼친 공적은 실체로 남아 있다.\n김억에 대한 평가는 공적과 한계로 나뉘지만, 이 책 《김억 작품집》을 통해서 한국 초기 시단을 이끈 대표적 시인 김억의 창작시를 비롯한 다양한 작품과 문단 저널리즘 정착에 기여한 그의 시론 및 기타 산문 또한 두루 살펴볼 수 있기를 바란다.',
  //   },
  //   {
  //     title: '작은 것들을 위한 시: BTS 노래산문 (BTS 노래산문)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32445284843',
  //     image: 'https://shopping-phinf.pstatic.net/main_3244528/32445284843.20220527050224.jpg',
  //     author: '나태주',
  //     discount: '14400',
  //     publisher: '열림원',
  //     pubdate: '20220120',
  //     isbn: '9791170400677',
  //     description:
  //       '“이 일곱 소년이 우리 곁에 있는 한,\n우리는 너무 일찍 절망하거나 포기할 필요가 없어.”\n\n청춘들의 깊은 고민과 반짝이는 사랑을 노래한 BTS의 가사에 나태주 시인의 산문을 더한, 단 한 권의 ‘BTS 노래산문집’이 출간되었다. BTS(방탄소년단)가 직접 한 줄 한 줄의 노랫말로 써내려간 그들의 삶은 언어와 세대를 넘어 전 세계 사람들의 공감을 불러일으키며, 많은 사람들의 위로와 감동이 되었다. “일상적이고 개인적이어서” 더욱 “친근함을 느끼게” 해주는 그들의 가사는 오랜 시간 우리에게 작고 사소한 것의 소중함을 일러준 ‘풀꽃 시인’ 나태주의 시와 무척 닮아 있다.\n평소 BTS의 노랫말에 관심이 있었다는 시인은 감명 받은 서른다섯 편의 가사를 함께 읽어 내려가며 그 안에 살아 숨 쉬는 메시지를 찾고, 자신이 생각하고 느끼는 바를 솔직하게 털어놓는다. BTS의 메시지를 향해 때로는 담담하게, 때로는 감성적으로 써내려간 시인의 산문은 일상 속 “작은” 행복과 희망을 찾는 이들에게 방탄소년단의 음악과는 닮은 듯 다른 위로와 감동이 되어줄 것이다.\n\n* 이 책은 한국음악저작권협회와 정식 계약을 맺고 출간되었습니다.\n\n“하나 둘 셋 하는 사이에 모든 것이 바뀌길 기다리고 바라는 마음은 우리에게도 위안과 희망을 선사해. 이거야말로 노래가 주는 마술, 매직이야.” _본문에서',
  //   },
  //   {
  //     title: '도법 스님의 신심명 강의 (중도연기의 눈으로 본 깨달음의 노래)',
  //     link: 'https://search.shopping.naver.com/book/catalog/33179938633',
  //     image: 'https://shopping-phinf.pstatic.net/main_3317993/33179938633.20220630094717.jpg',
  //     author: '도법',
  //     discount: '15300',
  //     publisher: '불광출판사',
  //     pubdate: '20220622',
  //     isbn: '9791192476094',
  //     description:
  //       '깨달음은 어렵지 않다!\n\n이상을 꿈꾸는 현실주의자 도법 스님이\n중도연기의 눈으로 읽는\n지금 바로 ‘이해, 실현, 증명’되는 〈신심명〉\n\n“지극한 진리(깨달음)는 어려울 것이 없네. (지도무난 至道無難)\n오직 분리하여 가려냄을 꺼려 할 뿐. (유혐간택 唯嫌揀擇)”\n\n중국 선종 3조인 승찬 대사가 대중들이 알기 쉽게 선(禪)의 요체를 풀어쓴 〈신심명〉의 첫 구절이자 가장 유명한 구절이다. 또한 불교를 공부하는 사람들을 고민하게 만드는 구절이기도 하다. 146구 584자라는 짧은 분량이지만 그 안에는 깨달음은 거창하고 신비로운 무엇이 아니라 분별과 집착을 벗어나면 가능한 것이라는 가르침이 녹아 있다. 바로 중도(中道)의 가르침이다.\n 《도법 스님의 신심명 강의》는 도법 스님이 〈신심명〉을 읽고, ‘중도연기’의 시각으로 풀어 쓴 것이다. 글자에 얽매이기보다는 그 구절에 담긴 의미를 중심으로 〈신심명〉을 새롭게 옮기고, 그 구절에 담긴 가르침을 누구나 쉽게 읽고 이해할 수 있도록 오롯이 자신의 눈으로 풀어내었다. 이를 통해 무엇이 깨달음이고, 어떻게 해야 그 깨달음에 다다를 수 있는지를 살폈다.',
  //   },
  //   {
  //     title: '바람의 노래 (성낙수 시집)',
  //     link: 'https://search.shopping.naver.com/book/catalog/32967056619',
  //     image: 'https://shopping-phinf.pstatic.net/main_3296705/32967056619.20220619070140.jpg',
  //     author: '성낙수',
  //     discount: '10800',
  //     publisher: '열린동해문학',
  //     pubdate: '20220615',
  //     isbn: '9791188966950',
  //     description:
  //       '성낙수 시인의 시집. 바람도 흘러가듯이 세월 따라가는 것이 인생이니 손에 잡힐 듯, 하면서도 잡히지 않는 것이 세월이다. 매일 맞이하는 바람의 온도를 느낄 수 있는 하루의 삶을 자아내고 있다. 자신의 마음을 성찰하고, 바람결에 날려버린 시간, 초연히 자신과 마주한 시간, 저자의 작품 속에 고스란히 담아내어 자신의 울타리에 꽃을 피우고 있는 시집이다.',
  //   },
  //   {
  //     title: '호밀의노래',
  //     link: 'https://search.shopping.naver.com/book/catalog/32677893620',
  //     image: 'https://shopping-phinf.pstatic.net/main_3267789/32677893620.20220604092503.jpg',
  //     author: '차옥혜',
  //     discount: '9000',
  //     publisher: '현대시학사',
  //     pubdate: '20220602',
  //     isbn: '9791192079219',
  //     description: '본 도서는 차옥혜 시인의 시집이다. 차옥혜 시인의 주옥같고 흥미로운 작품들이 수록되어 있다.',
  //   },
  // ];

  return (
    <SearchBox>
      <SearchForm
        start={start}
        searchWord={searchWord}
        setStart={setStart}
        setSearchWord={setSearchWord}
        setSearchResult={setSearchResult}
        setTotalCnt={setTotalCnt}
      />
      <SearchInfo searchWord={searchWord} totalCnt={totalCnt} currentPage={currentPage} />
      <SearchResult searchResults={searchResult} />
      <Pagination currentPage={currentPage} totalCnt={totalCnt} setCurrentPage={setCurrentPage} setStart={setStart} />
    </SearchBox>
  );
};

const SearchBox = styled.div`
  margin: 40px 0;
`;

export default Search;
