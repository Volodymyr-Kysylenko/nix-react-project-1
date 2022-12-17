export default function getExchangeRate() {
    return {
        USD: { EUR: 0.95, UAH: 36.75, fullName: 'US Dollar'},
        EUR: { USD: 1.0526, UAH: 38.72, fullName: 'Euro' },
        UAH: { USD: 0.0272, EUR: 0.0258, fullName: 'Ukraine Hryvnia' }
    }
} 