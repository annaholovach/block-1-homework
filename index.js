// 1
const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

function localize(strings, ...values) {
    const translation = translations[language]

    let result = ""

    for (let i = 0; i < strings.length; i++) {
        result += strings[i]
        if (i < values.length) {
            result += translation[values[i]]
        }
    }
    return result
}

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`
const localizedIntroduction = localize`${introduction}`

// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
// console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

// 2

function highlightKeywords (template, keywords) {
    return template.replace(/\${(\d+)}/g, (_, index) => {
        const keyword = keywords[index]
        if (keyword) {
            return `<span class='highlight'>${keyword}</span>`
        }
        return _
    })
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

// console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

// 3

function multiline(template) {
    const lines = template.raw.flatMap(str => str.split('\n')).filter(line => line !== '').slice(1)
    return lines.map((line, index) => `${++index} ${line}`).join('\n')
}

const code = multiline`  
function add(a, b) {  
    return a + b;  
}  
`;

// console.log(code);
// Expected:
// "1 function add(a, b) {
// 2 return a + b;
// 3 }"

// 4

function debounce (func, delay) {
    let isCooldown = false
    return function() {
        if (isCooldown) return
        func.apply(this, arguments)
        isCooldown = true
        setTimeout(() => isCooldown = false, delay)
    }
}

function debouncedSearch(query) {
// Perform search operation with the query
    console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

// 5

function throttle (func, interval) {
    let isThrottled = false,
        savedArgs,
        savedThis
    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments
            savedThis = this
            return
        }
        func.apply(this, arguments)
        isThrottled = true;
        setTimeout(function() {
            isThrottled = false
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = savedThis = null
            }
        }, interval)
    }
    return wrapper
}

function onScroll(event) {
// Handle scroll event
    console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

// 6

function curry (func) {
    return function curried(...arity) {
        if (arity.length >= func.length) {
            return func.apply(this, arity)
        } else {
            return function(...arity2) {
                return curried.apply(this, arity.concat(arity2))
            }
        }
    }
}

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

// console.log("Result:", result); // Expected: 24