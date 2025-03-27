import { useState } from "react"

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validate = (validationRules) => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((field) => {
      const value = values[field] || ""
      const rules = validationRules[field]

      if (rules.required && !value.trim()) {
        newErrors[field] = `${field} is required`
        isValid = false
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`
        isValid = false
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || `Invalid ${field}`
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const resetForm = () => {
    setValues(initialState)
    setErrors({})
  }

  return {
    values,
    errors,
    handleChange,
    validate,
    resetForm,
    setValues,
  }
}

