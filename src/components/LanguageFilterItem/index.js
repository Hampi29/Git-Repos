// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageItem,selectItem} = props
  const {id, language} = languageItem
  const languageClassName = isActive ? 'tabs activetab' : 'tabs'
  const onClickItem = () => {
    selectItem(id)
  }
  return (
    <li>
      <button type="button" className={languageClassName} onClick={onClickItem}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
