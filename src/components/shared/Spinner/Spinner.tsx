import { classNames } from '@utils/classNames'

const Spinner = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={classNames([
        className,
        'h-[21px] w-[21px] rounded-[50%] border-[3.5px] border-t-primary-300 dark:border-t-primary-500 border-l-primary-300 dark:border-l-primary-500 border-r-transparent border-b-transparent animate-spin'
      ])}
    />
  )
}

export default Spinner
