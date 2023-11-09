import { useState } from "react";
import json from "./json/data.json";

function App() {
  const [options, setOptions] = useState([
    {
      name: "Daily",
      selected: false,
      lastWhat: "Day",
    },
    {
      name: "Weekly",
      selected: true,
      lastWhat: "Week",
    },
    {
      name: "Monthly",
      selected: false,
      lastWhat: "Month",
    },
  ]);

  return (
    <>
      <main>
        <h1 className="sr-only">Time tracking dashboard</h1>
        <div className="dashboard">
          <div className="dashboard__options-card">
            <div className="dashboard__options-card__info">
              <img src="/assets/image-jeremy.png" alt="your pic" />
              <div>
                <h2>Report for</h2>
                <div className="dashboard__options-card__info__name">
                  Jeremy Robson
                </div>
              </div>
            </div>
            <div className="dashboard__options-card__options">
              {options.map((option, index) => (
                <div
                  key={option.name}
                  className={option.selected ? "selected" : ""}
                  onClick={() => {
                    if (
                      options.find(
                        (selectedOption) =>
                          selectedOption.selected === true &&
                          selectedOption.name !== option.name
                      )
                    ) {
                      const newOptions = [...options];
                      newOptions.find(
                        (selectedOption) => selectedOption.selected
                      ).selected = false;
                      newOptions[index].selected = true;
                      setOptions(newOptions);
                    }
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
          {json.map((dataPiece) => (
            <div
              key={dataPiece.title}
              className={`dashboard__info-card ${dataPiece.title
                .toLocaleLowerCase()
                .replace(" ", "-")}`}
            >
              <div className="dashboard__info-card__info">
                <div className="dashboard__info-card__info__top-stuff">
                  <h2>{dataPiece.title}</h2>
                  <img src="/assets/icon-ellipsis.svg" alt="ellipsis" />
                </div>
                <div className="dashboard__info-card__info__bottom-stuff">
                  <div className="dashboard__info-card__info__cur-stat">
                    {`${
                      dataPiece.timeframes[
                        options
                          .find((option) => option.selected === true)
                          .name.toLowerCase()
                      ].current
                    }hrs`}
                  </div>
                  <div className="dashboard__info-card__info__prev-stat">
                    {`Last ${
                      options.find((option) => option.selected === true)
                        .lastWhat
                    } - ${
                      dataPiece.timeframes[
                        options
                          .find((option) => option.selected === true)
                          .name.toLowerCase()
                      ].previous
                    }hrs`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
