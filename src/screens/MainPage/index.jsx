import { InfoCard } from "../../components/InfoCard";
import "./styles.scss";

export function MainPage() {

    const mock = {
        name: 'Urubici, BR',
        temperature: '19°',
        humidity: '75%',
        pressure: '892hPA',
        updatedAt: 'Updated at 02:48:32 PM'
    }

  return (
    <div className="container">
      <div className="header-container"></div>
      <div className="content-container">
        <div className="cards-container">
          <InfoCard info={mock}/>
          <InfoCard info={mock}/>
          <InfoCard info={mock}/>
        </div>
      </div>
    </div>
  );
}
