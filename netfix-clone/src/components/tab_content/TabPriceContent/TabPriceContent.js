import React from "react";
import "./style.css";
import { Icon } from "react-icons-kit";
import { checkmark } from "react-icons-kit/icomoon/checkmark";
import { cross } from "react-icons-kit/icomoon/cross";

export default function TabPriceContent() {
  return (
    <div className="tab-price-content">
      <div className="tab-price-top-content">
        <p style={{fontSize: "1.2rem"}}>Choose one plane and watch everything on Netflix</p>
        <button className="btn">Try It Now</button>
      </div>
      <div className="tab-price-bottom-content">
        <table>
          <thead>
            <th></th>
            <th>Basic</th>
            <th>Standard</th>
            <th>Premium</th>
          </thead>
          <tbody>
            <tr>
              <td>Monthly price</td>
              <td>$9.99</td>
              <td>$13.99</td>
              <td>$16.99</td>
            </tr>
            <tr>
              <td>HD available</td>
              <td>
                <Icon icon={cross} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
            </tr>
            <tr>
              <td>Ultra HD available</td>
              <td>
                <Icon icon={cross} size={10} />
              </td>
              <td>
                <Icon icon={cross} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
            </tr>
            <tr>
              <td>Screens you can watch at the same time</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Watch on your laptop, tv and tablet</td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
            </tr>
            <tr>
              <td>Unlimited movies and TV shows</td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
            </tr>
            <tr>
              <td>Cancel anytime</td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
              <td>
                <Icon icon={checkmark} size={10} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
