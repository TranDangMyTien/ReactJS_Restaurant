import React from "react";
import styled from "styled-components";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import { imageZoomEffect, TitleStyles } from "./ReusableStyles";
export default function Products() {
  const data = [
    {
      image: product1,
      name: "Chicken Burger",
      price: "$22.4/pcs",
      description:
        "Juicy grilled chicken patty with fresh lettuce and our signature sauce.",
    },
    {
      image: product2,
      name: "Toasted Bread",
      price: "$5.5/pcs",
      description:
        "Crispy golden-brown bread, toasted to perfection for a delightful crunch.",
    },
    {
      image: product3,
      name: "Egg Sandwich",
      price: "$8/pcs",
      description:
        "Fluffy scrambled eggs layered between soft bread with a touch of seasoning.",
    },
    {
      image: product4,
      name: "Raspberry Cake",
      price: "$12.5/pcs",
      description:
        "Delicious sponge cake layered with raspberry filling and a creamy topping.",
    },
  ];
  return (
    <Section id="products">
      <div className="title">
        <h1>
          <span>This week's</span> promotion!
        </h1>
      </div>
      <div className="products">
        {data.map((product) => {
          return (
            <div className="product">
              <div className="image">
                <img src={product.image} alt="" />
              </div>
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <p>{product.description}</p>
              <button>Buy Now</button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${TitleStyles};
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding: 3rem 0.5rem;
    .product {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      justify-content: center;
      align-items: center;
      h3 {
        color: #fc4958;
      }
      p {
        text-align: center;
        font-size: 1.1rem;
        line-height: 2rem;
        letter-spacing: 0.1rem;
      }
      ${imageZoomEffect};
      .image {
        max-height: 20rem;
        overflow: hidden;
        border-radius: 1rem;
        img {
          height: 20rem;
          width: 15rem;
          object-fit: cover;
        }
      }
      button {
        border: none;
        padding: 1rem 4rem;
        font-size: 1.4rem;
        color: white;
        border-radius: 4rem;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        background: linear-gradient(to right, #fc4958, #e85d04);
        text-transform: uppercase;
        &:hover {
          background: linear-gradient(to right, #e85d04, #fc4958);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(252, 73, 88, 0.5);
        }

        &:active {
          transform: translateY(1px);
          box-shadow: 0 3px 10px rgba(252, 73, 88, 0.3);
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    .products {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
