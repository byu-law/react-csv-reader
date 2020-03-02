import React from 'react'
import { object, string, func, element, oneOfType } from 'prop-types'
import PapaParse from 'papaparse'

const CSVReader = ({
  accept = '.csv, text/csv',
  cssClass = 'csv-reader-input',
  cssInputClass = 'csv-input',
  fileEncoding = 'UTF-8',
  inputId = null,
  inputStyle = {},
  labelClass,
  onError,
  onFileLoaded,
  parserOptions = {},
  children
}) => {
  const handleChangeFile = e => {
    let reader = new FileReader()
    if (e.target.files.length > 0) {
      const filename = e.target.files[0].name

      reader.onload = event => {
        const csvData = PapaParse.parse(
          event.target.result,
          Object.assign(parserOptions, {
            error: onError,
            encoding: fileEncoding,
          }),
        )
        onFileLoaded(csvData.data, filename)
      }

      reader.readAsText(e.target.files[0], fileEncoding)
    }
  }

  return (
    <div className={cssClass}>
      <label className={labelClass}>
        <input
          className={cssInputClass}
          type="file"
          id={inputId}
          style={inputStyle}
          accept={accept}
          onChange={e => handleChangeFile(e)}
        />
        {children}
      </label>
    </div>
  )
}

CSVReader.propTypes = {
  accept: string,
  cssClass: string,
  cssInputClass: string,
  fileEncoding: string,
  inputId: string,
  inputStyle: object,
  label: oneOfType([string, element]),
  onError: func,
  onFileLoaded: func.isRequired,
  parserOptions: object,
}

export default CSVReader
