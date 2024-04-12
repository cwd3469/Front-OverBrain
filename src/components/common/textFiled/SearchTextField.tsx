import { css } from '@emotion/css';
import ic_search from '@/assets/svg/ic_search.svg';
import ic_reset_datepicker from '@/assets/svg/ic_reset_datepicker.svg';
import { DefaultTextFiled, type DefaultTextFiledProps } from './DefaultTextFiled';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { forwardRef } from 'react';

type SearchTextFiledProps = DefaultTextFiledProps & { onSearch?: SubmitHandler<Inputs> };

type Inputs = {
  search: string;
};

const SearchTextFiled = forwardRef<HTMLFormElement, SearchTextFiledProps>(({ onSearch, ...props }, ref) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if (!onSearch) return;
    await onSearch(data);
    reset();
  };

  return (
    <SearchForm onSubmit={onSearch && handleSubmit(onSubmit)} ref={ref}>
      <DefaultTextFiled
        className={style}
        style={{ paddingLeft: '36px' }}
        placeholder="검색어를 입력하세요"
        type="search"
        {...register('search')}
        {...props}
      />
      <SearchBtn>검색</SearchBtn>
    </SearchForm>
  );
});
SearchTextFiled.displayName = 'SearchTextFiled';
export default SearchTextFiled;

const SearchForm = styled.form`
  display: flex;
  gap: 4px;
`;

const SearchBtn = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  width: 72px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: var(--RadiusMD, 6px);
  background: var(--CoolGray-CoolGray800, #2d3e4f);
  color: #fff;
`;

const style = css({
  backgroundImage: `url(${ic_search})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '8px center',
  '::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
    backgroundImage: `url(${ic_reset_datepicker})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    backgroundPosition: 'center left',
    width: '16px',
    height: '16px',
  },
});
