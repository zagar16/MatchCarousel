import MatchCarousel from "./MatchCarousel";
import "./App.css";

import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  function Tab1Content() {
    return (
      <div className="padding-top">
        <MatchCarousel max={10} />
      </div>
    );
  }

  function Tab2Content() {
    return (
      <div className="padding-top">
        <MatchCarousel sportId={1} />
        <MatchCarousel sportId={2} />

      </div>
    );
  }

  return (
    <div>
      <div className="cssTab">
        <button onClick={() => handleTabClick("tab1")}>Tab 1</button>
        <button onClick={() => handleTabClick("tab2")}>Tab 2</button>
      </div>
      {activeTab === "tab1" && <Tab1Content />}
      {activeTab === "tab2" && <Tab2Content />}
    </div>
  );
}

export default App;
