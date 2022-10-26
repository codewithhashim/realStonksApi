import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [stock, setStock] = useState("Fb");
  const [btnText, setBtnText] = useState("Search");
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockInformation = async (e) => {
    e.preventDefault();

    try {
      setRes(null);
      setError(null);
      setBtnText("Loading...");
      const res = await axios.get(`/api/hello`, {
        params: { stock },
      });

      if (res.status === 404) {
        throw err;
      }

      setRes(res.data);
    } catch (err) {
      setError(err);
    }

    setBtnText("Search");
  };

  return (
    <div>
      <h2>
     The Stonks API
      </h2>
      <div>
        <form >
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button
             onClick={fetchStockInformation}
          >
            {btnText}
          </button>
        </form>
        {res && (
          <div >
            <table>
              <tbody>
                <tr>
                  <td >Price</td>
                  <td >
                    USD {res.price}
                  </td>
                </tr>
                <tr>
                  <td >
                    Change Percentage
                  </td>
                  <td >
                    {res.change_percentage}
                  </td>
                </tr>
                <tr>
                  <td>
                    Change Point
                  </td>
                  <td >
                    {res.change_point}
                  </td>
                </tr>
                <tr>
                  <td >Total Vol</td>
                  <td>
                    {res.total_vol}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {error && (
          <div >
            <p >
              {error.toString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}