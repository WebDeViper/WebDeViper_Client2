import React, { useState } from 'react';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function TodoList({ selectedDate, filteredTodos, handleUpdateTodo, handleAddTodo }) {
  const [expanded, setExpanded] = useState('');

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className="py-20 px-10 bg-white relative md:w-auto w-full">
      <button
        onClick={handleAddTodo}
        className="rounded-full bg-lime-400 p-2.5 text-xl absolute top-6 hover:rotate-180 transition right-7"
      >
        <AiOutlinePlus />
      </button>
      <div className="mb-6 font-semibold">
        <span>{moment(selectedDate).format('yyyy년 MM월 DD일')}</span>
      </div>
      <div>
        {filteredTodos.map((item, index) => (
          <Accordion
            key={item._id}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(props => (
  <MuiAccordionSummary expandIcon={<MdKeyboardArrowRight size={20} />} {...props} />
))(({ theme }) => ({
  padding: '0',
  // backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .02)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    '& .MuiTypography-body1': {
      fontSize: '14px',
      fontWeight: '600',
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  '& .MuiTypography-body1': {
    fontSize: '14px',
  },
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
