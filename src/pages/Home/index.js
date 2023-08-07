import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRepoAction } from '../../redux/slice/repo';
import { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import AccordionComponent from './Accordion';
import { useState } from 'react';

const Home = () => {
  const [page, setPage] = useState(1);
  const state = useSelector((state) => state.repo);
  const dispatch = useDispatch();

  
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const fetchData = () => {
    const payload = { date: date.toISOString().split('T')[0], page: page }
    
    dispatch({ type: 'GET_REPO', payload: payload })
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 // Adding some threshold to trigger fetch earlier
    ) {
      if (!state?.repos?.isLoading) {
        setPage(prevPage => prevPage + 1); // Increment the page number
      }
    }
  }

  useEffect(() => {
    fetchData(); // Initial data fetch

    // Add event listener to scroll
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Remove event listener on unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <Container maxWidth="xl">
      {
        state?.repos?.data?.length && state?.repos?.data?.map(item =>

          <AccordionComponent key={item.id} item={item} />)
      }

    </Container>
  )
}

export default Home