import styled from "styled-components";
import useSWR from "swr";

const CheckoutWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckoutContent = styled.div`
  background: white;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  width: 80%;
  max-width: 500px;
  height: 80%;
  padding: 24px;
`;

const Swiper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 12px;
`;

const Card = styled.div`
display:flex;
flex-flow:column;
height:350px
width:70% 

& .imgContainer{
  width:100%;
  height:250px;
  object-fit:contain;
  background:gray;
}`;

export default function Checkout({ combinedData, amountToPay }) {
  // const { data: UserProductCounter, isLoading: UserProductCounterIsLoading } =
  //   useSWR(`/api/users/productCounter`, {
  //     refreshInterval: 10000,
  //   });

  const { data: organizations, isLoading: organizationsIsLoading } = useSWR(
    `/api/organizations`,
    {
      refreshInterval: 10000,
    }
  );

  return (
    <CheckoutWrapper>
      <CheckoutContent>
        <h1>Thank you for your Donation!</h1>
        <Swiper>
          {console.log(combinedData)}
          {combinedData.map((data) => {
            return (
              <Card>
                <div className="imgContainer">
                  <img src="google.com"></img>
                </div>
                <h2>Tafel Weißensee</h2>
                <p>23,04 €</p>
              </Card>
            );
          })}
        </Swiper>
      </CheckoutContent>
    </CheckoutWrapper>
  );
}
