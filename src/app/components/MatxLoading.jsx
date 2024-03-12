import { CircularProgress, Box, styled } from '@mui/material';

const StyledLoading = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  position: "absolute",
  alignItems: 'center',

  left: "50%",
  '& img': {
    width: 'auto',
    height: '25px'
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -7,
    right: 0,
    top: 'calc(50% - 20px)'
  }
});

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src="/assets/images/logo-circle.svg" alt="" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
