import randomColor from 'randomcolor';
import formatEvents from './helper/formatEvents';
import inputs from './events.json';

import './App.scss';

function App() {
  const events = formatEvents(inputs);

  const classes = {
    container: 'planity-test',
    planning: 'planity-test__planning',
    event: 'planity-test__event'
  };

  return (
    <div className={classes.container}>
      <div className={classes.planning}>
        {events.map((eventGroups, index) => (
          <div key={`events-group-${index}`}>
            {eventGroups.map(({ start, duration, id, width, left }) => {
              const style = {
                '--color': randomColor(),
                '--top': `${start}px`,
                '--duration': `${duration}px`,
                '--width': `${width}%`,
                '--left': `${left}%`
              };

              return (
                <div key={`event-${id}`} className={classes.event} style={style}>
                  <p>{id}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
