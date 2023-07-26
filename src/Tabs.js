import React, { useState } from 'react';
import { GameStateProvider } from './GameStateContext';
import ManageSupply from './ManageSupply';
import ManageChores from './ManageChores';
import News from './News';
import './Tabs.css';
import NextDayButton from './NextdayButton';

const TabContent = ({ activeTab, content, children }) => {
  return activeTab === content.label && <div>{children}</div>;
};

const Tab = ({ label, onClick, activeTab }) => {
  return (
    <button
      className={activeTab === label ? 'tab active-tab' : 'tab inactive-tab'}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Tab 1');

  const tabs = [
    { label: 'Supply', content: 'This is the content of Tab 1' },
    { label: 'Activity', content: 'This is the content of Tab 2' },
    { label: 'Events', content: 'This is the content of Tab 3' },
  ];

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className='tabs'>
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} onClick={handleTabClick} activeTab={activeTab} />
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <TabContent key={tab.label} activeTab={activeTab} content={tab}>
            {activeTab === 'Supply' ? <ManageSupply /> : null}
            {activeTab === 'Activity' ? <ManageChores />: null}
            {activeTab === 'Events' ? <News/> : null}
          </TabContent>
        ))}
      </div>
      <NextDayButton />
    </div>
  );
};

export default () => {
  return (
    <GameStateProvider>
      <Tabs />
    </GameStateProvider>
  );
};
