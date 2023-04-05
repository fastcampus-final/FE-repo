import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const TableSearch = ({ onSubmit }: any) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input name="filter" />
      <Button variant="outlined">
        <SearchIcon />
      </Button>
    </Form>
  );
};

export default TableSearch;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 70%;
  height: 32px;
  border-radius: 8px;
  border: 3px solid;
`;
