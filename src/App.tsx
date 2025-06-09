import React from 'react';
import EventCalendar from './components/EventCalendar';
import { events } from '../data/input';
import './styles/app.scss';

const App: React.FC = () => {
    return (
        <div>
            <h1>Calendrier</h1>
            <EventCalendar events={events} />
        </div>
    );
};

export default App;
