import styled from "styled-components";

export default function Banner() {
  const BannerWrapper = styled.section`
    background: linear-gradient(266.86deg, #43b4d8 8.28%, #7343d8 91.96%);
    color: white;
    display: flex;
    flex-flow: row wrap;
    gap: 24px;
    align-items: center;

    & span {
      font-size: 5em;
      padding-left: 12px;
    }
  `;

  const TextWrapper = styled.div`
    flex: 3 2;
    display: flex;
    flex-flow: column;

    & > h2 {
      font-size: 2.5em;
      text-align: left;
    }
  `;

  // In Mongo I'll create a collection for globally public content, such as Meals provided Counter :)
  return (
    <BannerWrapper>
      <span>🍽</span>
      <TextWrapper>
        <h2>12.945</h2>
        <p>Meals provided since we started 14 weeks ago.</p>
      </TextWrapper>
    </BannerWrapper>
  );
}
