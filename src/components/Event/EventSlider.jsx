import React from 'react';
import Slider from 'react-slick';
import { v4 as uuidv4 } from 'uuid';
import './slider.css';
import EventItem from './EventItem';

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  draggable: false,
  arrows: true,
  speed: 300,
  // autoplay: true,
  // autoplaySpeed: 5000,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        draggable: true,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        draggable: true,
        arrows: false,
        centerMode: true,
      },
    },
  ],
};

const EventSlider = React.memo(
  ({ ticketItems, category, onSelectTicket, selectTicket }) => {
    return (
      <>
        {ticketItems && (
          <Slider {...settings}>
            {ticketItems &&
              ticketItems.map(ticket => (
                <EventItem
                  key={uuidv4()}
                  category={category}
                  ticket={ticket}
                  onSelectTicket={onSelectTicket}
                  selectTicket={selectTicket}
                />
              ))}
          </Slider>
        )}
      </>
    );
  },
);

export default EventSlider;
