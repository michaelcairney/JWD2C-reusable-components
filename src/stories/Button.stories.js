import Button from '../components/button/Button';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    text: 'test'
  },
};

export const Primary = {
  args: {
    text: 'Button',
    height: '106px',
    width: '290px',
    mobileHeight: '96px',
    mobileWidth: '160px',
    mediaBreakpoint: '1230px',
    backgroundColor: '#1B2335',
    border: '3px solid #143DaF',
    borderRadius: '14px',
    textColor: 'white',
    transition: '0.3s ',
    customHoverCSS: 'border: 3px solid #65B33A',
  }
}
export const Secondary = {
  args: {
    text: 'Button',
    height: '126px',
    width: '126px',
    backgroundColor: '#113355',
    borderRadius: '100%',
    textColor: 'white',
    transition: '1s cubic-bezier(0.19, 1, 0.22, 1)',
    customHoverCSS: `
        background: white;
        color: black;
        transform: scale(1.26);
        .child { 
          transform: scale(0.8)
        };
        @media only screen and (max-width: 850px) {
            background: white;
            transform: none;
    
            .child {
              transform: none;
            }
        }`,
  }
}


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
