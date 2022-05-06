import "./styles.scss";

export function InfoCard(props) {

  const {info} = props;

  return (
    <div className="card-container">
      <div className="title-container">
        <div className="city-name">{info.name}</div>
      </div>
      <div className="info-container">
        <div className="info-temperature">{info.temperature}</div>

        <div className="info-details">
          <div className="info-humidity">{info.humidity}</div>
          <div className="info-pressure">{info.pressure}</div>
        </div>
      </div>
      <div className="footer-container">
        <div className="update-text">{info.updatedAt}</div>
      </div>
    </div>
  );
}
