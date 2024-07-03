export function findImage(name) {
    switch (name) {
        case 'home':
            return require('../assets/images/home.png');
        case 'house':
            return require('../assets/images/house.png');
        case 'airplane':
            return require('../assets/images/airplane.png');
        case 'automotive':
            return require('../assets/images/automotive.png');
        case 'compliant':
            return require('../assets/images/compliant.png');
        case 'education':
            return require('../assets/images/education.png');
        case 'fast-food':
            return require('../assets/images/fast-food.png');
        case 'gaming':
            return require('../assets/images/gaming.png');
        case 'movies':
            return require('../assets/images/movies.png');
        case 'hook':
            return require('../assets/images/hook.png');
        case 'healthcare':
            return require('../assets/images/healthcare.png');
        case 'customer-service':
            return require('../assets/images/customer-service.png');
    }
}