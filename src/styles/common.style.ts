import styled from "styled-components";
import { lighten } from 'polished';

export const Header = styled.div`
  background: hsla(30, 7%, 6%, 0.9);
  backdrop-filter: blur(10px);
  /* background: #100f0e; */
  display: flex;
  align-items: center;
  padding: 0 ${(props) => `${props.ww(4)}rem`};
  position: fixed;
  z-index: 2;
  height: ${(props) => `${props.ww(10)}rem`};
  width: 100%;
`;

export const Container = styled.div`
  background: #000;
`;
export const Group = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: ${(props) => `${props.ww(1.8)}rem`};
`;
export const Dir = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
`;
export const Profile = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${(props) => `${props.ww(2.8)}rem`};
`;

export const SearchGroup = styled.div`
  position: relative;
`;

export const Search = styled.input`
  background: none;
  width: ${(props) => `${props.ww(30)}rem`};
  height: ${(props) => `${props.ww(4.2)}rem`};
  border: 1.5px solid #8993a8;
  border-radius: 4px;
  padding: 1rem 5rem 1rem 1rem;
  color: #8993a8;
  font-weight: 400;
  font-size: ${(props) => `${props.ww(1.8)}rem`};
`;

export const Searchicon = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(-4rem, -50%);
`;

export const Main = styled.div`
  display: flex;
  grid-template-columns: ${(props) => `${props.ww(32)}rem`} 1fr;
  padding-top: ${(props) => `${props.ww(10)}rem`};
  margin: 0 auto;
  height: 100vh;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;
export const AppComponent = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;







// StatsCards Section
export const StatsCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    // width: ${(props) => `${props.ww(1050)}px`};
    width: 100% ;
    overflow-x: hidden;
    gap: ${(props) => `${props.ww(18)}px`};
    margin-bottom: ${(props) => `${props.ww(15)}px`};
`;

export const StatsCard = styled.div`
    background: #100f0e;
    border-radius: 8px;
    height: ${({ww, h}) => `${ww(h?? 150)}px`};
    width: ${({ww, w}) => `${ww(w?? 232)}px`};
    padding: ${(props) => `${props.ww(12)}px`};
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
    border-width: 1.5px;
    cursor: pointer;
    &:hover {
        border: 1.5px solid #C3AD60;
    }
`;

export const StatsCardHead = styled.h3`
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: ${props => `${props.ww(8)}px`};
    color: #D0D4DC;
    font-size: 18px;
    margin: 0;
    font-size: ${(props) => `${props.ww(16)}px`};
`;

export const StatsCardBody = styled.div`
    font-weight: 400;
    margin: 0;
    font-size: ${(props) => `${props.ww(35)}px`};
`;

export const StatsCardFooter = styled.div`
    margin: 0;
    display: flex;
    min-height: ${(props) => `${props.ww(25)}px`};
    align-items: center;
    gap: 14px;
`;

export const PercentHolder = styled.div`
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const PercentText = styled.span`
    font-weight: 400;
    display: block;
    font-size: ${(props) => `${props.ww(14)}px`};
`;

export const Traction = styled.span`
    font-weight: 400;
    display: block;
    font-size: ${(props) => `${props.ww(12)}px`};
`;

// Transaction Details Section
export const TransactionUnit = styled.div`
    display: grid;
    color: #8993A8;
    gap: ${(props) => props.ww(6)}px;
    padding-top: ${(props) => props.head? `${props.ww(10)}px`: `${props.ww(6)}px`};
    padding-bottom: ${(props) => props.head? `${props.ww(10)}px`: `${props.ww(6)}px`};
    grid-template-columns: repeat(${(props) => props.children.length}, 1fr);
    // grid-template-columns: repeat(${(props) => props.children.length}, minmax(${(props) => props.ww(100)}px, ${(props) => props.ww(180)}px));
    border-bottom: ${(props) => props.head? '1.5px solid #262A32': ''};
    margin-bottom: ${(props) => props.head? `${props.ww(16)}px`: ''};
    font-size: ${(props) => props.head? `${props.ww(16)}px`: `${props.ww(14)}px`};
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const TransactionBody = styled.div`
    display: flex;
    color: #8993A8;
    width: 100%;
    flex-direction: column;
    gap: ${(props) => props.ww(5)}px
`;

export const TransactionUnitValue = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 5px;
    font-family: 'Roboto';
    font-weight: 200;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
`;

// Other Components
export const FlexCard = styled.div` 
    display: flex;
    flex-wrap: ${({wrap}) => wrap?? ''};
    overflow: ${({overflow}) => overflow?? ''};
    overflow-x: ${({overflowX}) => overflowX?? ''};
    overflow-y: ${({overflowY}) => overflowY?? ''};
    border: ${({border, ww}) => border? `${ww(2)}px solid ${border}`: ''};
    border-style: ${({borderStyle, ww}) => borderStyle?? ''};
    border-radius: ${({radius, ww}) => radius? `${ww(Number(radius))}px`: '8px'};
    width: ${({ ww, w}) => typeof w === 'number'? `${ww(w)}px`: w};
    height: ${({ ww, h}) => typeof h === 'number'? `${ww(h)}px`: h};
    background: ${(props) => props.bg};
    flex-direction: ${(props) => props.direction};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    gap: ${(props) => props.ww(props.gap)}px;
    padding: ${(props) => props.ww(props.p? props.p: 20)}px;
    padding-top: ${(props) => props.ww(Number(props.pt))}px;
    padding-right: ${(props) => props.ww(Number(props.pr))}px;
    padding-bottom: ${(props) => props.ww(props.pb)}px;
    padding-left: ${(props) => props.ww(props.pl)}px;
    margin-top: ${(props) => props.ww(props.mt)}px;
    margin-right: ${(props) => props.ww(props.mr)}px;
    margin-bottom: ${(props) => props.ww(props.mb)}px;
    margin-left: ${(props) => props.ww(props.ml)}px;
    cursor: ${({mouse}) => mouse?? 'default'};
    &:hover {
        background: ${(props) => props.hasOwnProperty('lightenOnHover')? lighten(0.09991, props.bg?? ''): ''};
        color: ${(props) => props.hasOwnProperty('colourOnHover')? props.colourOnHover: 'default' };
    };
    &::-webkit-scrollbar {
      display: none;
    }
`;

export const GridBox = styled.div`
    display: grid;
    grid-cols: ${({cols}) => cols}
`;

export const StyledSpan = styled.span`
    display: flex;
    height: '100%'; 
    width: ${(props) => props.w};
    color: ${({color}) => color?? 'inherit'};
    background: ${({bg}) => bg?? 'inherit'};
    text-transform: ${({textTransform}) => textTransform?? 'capitalize'};
    font-size: ${(props) => props.ww(props.fontSize)}px;
    font-weight: ${({fontWeight}) => fontWeight? fontWeight: 300};
    padding: ${(props) => props.ww(props.p? props.p: 0)}px;
    padding-right: ${(props) => props.ww(props.pr)}px;
    padding-left: ${(props) => props.ww(props.pl)}px;
    padding-top: ${(props) => props.ww(props.pt)}px;
    padding-bottom: ${(props) => props.ww(props.pb)}px;
    border-right: ${({ww, br}) => br? `${ww(1.5)}px solid #262A32`: ''};
    border-radius: ${({ww, radius}) => `${ww(radius?? 5)}px`}
`;

export const PositioningBox = styled.div`
    position: ${ ({position}) => position };
    top: ${ ({top}) => top }%;
    right: ${ ({right}) => right }%;
    bottom: ${ ({bottom}) => bottom }%;
    left: ${({left}) => left}%;
    z-index: ${({zIndex}) => zIndex };
    width: ${({w}) => w?? 'auto'};
    height: ${({h}) => h?? 'auto'};
    display: flex;
    padding: ${({ww,p}) => ww(p? p: 0)}px;
    padding-top: ${({ ww,pt }) => ww(pt)}px;
    padding-right: ${({ ww,pr }) => ww(pr)}px;
    padding-bottom: ${({ ww,pb }) => ww(pb)}px;
    padding-left: ${({ ww,pl }) => ww(pl)}px;
    flex-direction: ${ ({direction}) => direction };
`;

export const BasicTab = styled.div`
    font-weight: 400;
    font-size: ${(props) => props.ww(18)}px;
    line-height: 120%;
    color: #8993A8;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.ww(10)}px;
    padding: ${(props) => props.ww(10)}px;
    height: ${(props) => props.ww(28)}px;
    background: #080604;
    border-radius: ${(props) => props.ww(8)}px;
`;

export const CategoryTab = styled.div`
    min-width: ${(props) => props.ww(props.w?? '')}px;
    width: ${(props) => typeof props.w === 'number'? `${props.ww(props.w)}px`: props.w === 'full'? '100%': props.w};
    margin-left: ${props => props.ml};
    &.active {
        background-color: #100f0e;
        > div {
            color: #d0d4dc;
            border-top-left-radius: ${props => props.ww(8)}px;
            border-top-right-radius: ${props => props.ww(8)}px;
            background-color: black;
            &:hover {
                background-color: ${lighten(0.09991, 'black')};
            };
        };
    };
    &.before-active {
        > div {
            border-bottom-right-radius: ${props => props.ww(5)}px;
            background-color: #100f0e;
            &:hover {
                background-color: ${lighten(0.09991, '#100f0e')};
            };
        };
    };
    &.after-active {
        > div {
            border-bottom-left-radius: ${props => props.ww(5)}px;
            background-color: #100f0e;
            &:hover {
                background-color: ${lighten(0.09991, '#100f0e')};
            };
        }
    }
`;

export const CategoryTabInner = styled.div`
    min-width: ${(props) => props.ww(props.w?? '')}px;
    height: 100%;
    font-weight: 400;
    display: flex;
    color: #5e687d;
    align-items: center;
    white-space: nowrap;
    justify-content: ${({justify}) => justify};
    gap: ${({ww, gap}) => ww(gap?? 6)}px;
    font-size: ${({ww, fontSize}) => ww(fontSize? Number(fontSize): 18)}px;
    padding: ${({ww, p}) => ww(p?? 10)}px;
    padding-left: ${({ww, pl}) => ww(pl?? 16)}px;
    padding-right: ${({ww, pr}) => ww(pr?? 16)}px;
    background-color: ${({bg}) => bg?? '#100f0e'};
    border-radius: ${({ww, radius}) => ww(radius?? '')}px;
    cursor: ${(props) => props.hasOwnProperty('clickable')? 'pointer': 'default'};
    &:hover {
        background-color: ${lighten(0.09991, '#100f0e')};
    };
`;

export const CategoryTabSmallDot = styled.div`
    background-color: #564d2e;
    width: ${({ww}) => ww(8)}px;
    height: ${({ww}) => ww(8)}px;
    border-radius: 50%
`;

export const CategoryGridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px 15px;
    place-items: center;
`;

export const CategoryTabLargeDot = styled.div`
    background-color: #c3ad60;
    width: ${({ww}) => ww(9)}px;
    height: ${({ww}) => ww(9)}px;
    border-radius: 50%
`;

export const BasicLink = styled.a`
    &:hover {
        text-decoration: underline;
        color: #C3AD60;
    }
`;

export const BasicHeader = styled.h2`
    width: ${(props) => `${props.ww(props.w)}px`};
    height: ${(props) => `${props.ww(props.h)}px`};
    margin: 0;
    text-transform: ${({textTransform}) => textTransform?? 'capitalize'};
    font-weight: ${({fontWeight}) => fontWeight?? 300};
    font-size: ${({ww, fontSize}) => `${ww(fontSize? fontSize: 18)}px`};
    &:hover {
        // text-decoration: underline;
        color: #C3AD60;
    }
`;

export const BasicParagraph = styled.h2`
    width: ${(props) => `${props.ww(props.w)}px`};
    height: ${(props) => `${props.ww(props.h)}px`};
    margin: 0;
    color: ${({color}) => color?? ''};
    text-transform: ${({textTransform}) => textTransform?? 'normal'};
    font-weight: ${({fontWeight}) => fontWeight?? 300};
    font-size: ${({ww, fontSize}) => `${ww(fontSize? fontSize: 14)}px`};
`;

// Forms
export const BasicForm = styled.form`
    display: flex;
    gap: ${({ww, gap}) => ww(gap?? 16)}px;
    flex-direction: ${({direction}) => direction};
    width: ${({ww, w}) => typeof w === 'number'? `${ww(w)}px`: w};
    padding: ${({ ww,p }) => `${ww(p?? 10)}px`};
`;

export const CheckBox = styled.input`
    height: ${(props) => `${props.ww(props.h)}px`};
    width: ${(props) => `${props.ww(props.w)}px`};
    border: 1.5px solid #8993A8;
    border-radius: ${(props) => props.radius}px;
    font-weight: 400;
    font-size: ${(props) => props.ww(props.fontSize)}px;
    color: #8993A8;
`;

export const Button = styled.button.attrs(({type}) => ({
    type: type?? 'button'
  }))`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    white-space: ${({w}) => !w && 'nowrap'};
    width: ${({ww, w}) => typeof w === 'number'? `${ww(w)}px`: typeof w !== 'number'? w: 'auto' };
    padding: ${({ww, p}) => p? ww(p): 10}px;
    padding-top: ${({ww, pt}) => ww(pt)}px;
    padding-right: ${({ww, pr}) => ww(pr)}px;
    padding-bottom: ${({ww, pb}) => ww(pb)}px;
    padding-left: ${({ww, pl}) => ww(pl)}px;
    font-size: ${({ ww, fontSize }) => `${fontSize? ww(fontSize): ww(14)}px`};
    font-weight: ${({ ww, fontWeight }) => fontWeight?? 700};
    text-transform: ${({textTransform}) => textTransform?? 'normal'};
    height: ${(props) => `${props.ww(25)}px`};
    color: ${(props) => props.text};
    background: ${({bg}) => bg?? 'transparent'};
    border-radius: ${({ww, radius}) => `${ww(radius?? 8)}px`};
    border: 1.5px solid ${(props) => props['border']};
    cursor: pointer;
    &:hover {
        background: ${({bg}) => lighten(0.09991, bg)};
    }
`;

export const BasicInput = styled.input`
    height: ${(props) => `${props.ww(props.h)}px`};
    width: ${(props) => `${props.ww(props.w)}px`};
    background: transparent;
    border: 1.5px solid #8993A8;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${(props) => props.ww(12)}px ${(props) => props.ww(10)}px;
    padding-top: ${(props) => props.ww(Number(props.pt))}px;
    padding-right: ${(props) => props.ww(Number(props.pr))}px;
    padding-bottom: ${(props) => props.ww(props.pb)}px;
    padding-left: ${(props) => props.ww(props.pl)}px;
    border-radius: ${({ww, radius}) => ww(radius)}px;
    font-weight: 400;
    font-size: ${({ww, fontSize}) => ww(fontSize)}px;
    color: ${({color}) => color?? '#3a3a3b'};
`;

export const BasicTextArea = styled.textarea`
    height: ${(props) => `${props.ww(props.h)}px`};
    width: ${(props) => `${props.ww(props.w)}px`};
    background: #1B1918;
    border: 1.5px solid #262A32;
    resize: ${({resize}) => resize?? 'vertical'};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${(props) => props.ww(12)}px ${(props) => props.ww(10)}px;
    padding-top: ${(props) => props.ww(Number(props.pt))}px;
    padding-right: ${(props) => props.ww(Number(props.pr))}px;
    padding-bottom: ${(props) => props.ww(props.pb)}px;
    padding-left: ${(props) => props.ww(props.pl)}px;
    border-radius: ${(props) => props.ww(props.radius)}px;
    font-weight: 400;
    font-size: ${(props) => props.ww(props.fontSize)}px;
    color: ${({color}) => color?? '#8993A8'};
    margin: 0;
    &:focus {
        outline: ${({ww}) => ww(2.0)}px solid #c3ad60;
    };

    -webkit-appearance: none;scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
    /* For WebKit (Safari and Chrome) */
    &::-webkit-scrollbar {
      width: ${({ww}) => `${ww()}px`};
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const TransactionInput = styled.input`
    height: ${(props) => `${props.ww(props.h)}px`};
    width: ${(props) => `${props.ww(props.w)}px`};
    background: #1B1918;
    border: 1.5px solid #262A32;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${(props) => props.ww(12)}px ${(props) => props.ww(10)}px;
    padding-top: ${(props) => props.ww(Number(props.pt))}px;
    padding-right: ${(props) => props.ww(Number(props.pr))}px;
    padding-bottom: ${(props) => props.ww(props.pb)}px;
    padding-left: ${(props) => props.ww(props.pl)}px;
    border-radius: ${(props) => props.ww(props.radius)}px;
    font-weight: 400;
    font-size: ${(props) => props.ww(props.fontSize)}px;
    text-transform: ${({textTransform}) => textTransform?? 'normal'};
    color: ${({color}) => color?? '#8993A8'};
    &:focus {
        outline: ${({ww}) => ww(2.0)}px solid #c3ad60;
    };
    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const BasicSelect = styled.select`
    height: ${(props) => `${props.ww(props.h)}px`};
    width: ${(props) => `${props.ww(props.w)}px`};
    background: ${({bg}) => bg?? '#1B1918'};
    border: ${({border}) => border?? '1.5px solid #262A32'};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ww, p}) => `${ww(p)}px`?? '13px 10px'};
    border-radius: ${({radius}) => radius}px;
    font-weight: bolder;
    font-size: ${(props) => `${props.ww(props.fontSize)}px`};
    text-transform:  ${({textTransform}) => textTransform?? 'capitalize'};
    color: ${({color}) => color?? '#8993A8'};
    // appearance: none;
    &:focus {
        border: ${({ww}) => ww(2.0)}px solid #c3ad60;
        outline: ${({ww}) => ww(2.0)}px solid #c3ad60;
    };
`;

export const CustomOption = styled.option`
    background-color: #c3ad60;
    color: ${({color}) => color?? '#f1f1f1'};
    padding: ${({ww, p}) => ww? (p? `${ww(p)}px`: `${ww(10)}px`): ''};
    cursor: pointer;
    text-transform: capitalize;
    &:hover {
        color: #c3ad60;
        background: 'red'
    }
`;

export const BasicLabel = styled.label`
    width: ${(props) => `${props.ww(props.w)}px`};
    height: ${(props) => `${props.ww(props.h)}px`};
    font-weight: 400;
    color: #D0D4DC;
    font-size: ${(props) => `${props.ww(props.fontSize)}px`};
`;

// Table