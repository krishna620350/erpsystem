class SchoolModel {
    #validatorRules = {
        name: {
            type: 'string',
            required: true,
            regex: /^[a-zA-Z\s]+$/,
            errorMessage: 'Invalid name. Only letters and spaces are allowed.',
        },
        location: {
            type: 'object',
            required: true,
            properties: {
                address: {
                    type: 'string',
                    required: true,
                    regex: /^[a-zA-Z0-9\s]+$/,
                    errorMessage: 'Invalid address. Only letters, numbers, and spaces are allowed.',
                },
                city: {
                    type: 'string',
                    required: true,
                    regex: /^[a-zA-Z\s]+$/,
                    errorMessage: 'Invalid city. Only letters and spaces are allowed.',
                },
                state: {
                    type: 'string',
                    required: true,
                    regex: /^[a-zA-Z\s]+$/,
                    errorMessage: 'Invalid state. Only letters and spaces are allowed.',
                },
                zip: {
                    type: 'string',
                    required: true,
                    regex: /^\d{6}$/,
                    errorMessage: 'Invalid zip code. Must be 5 digits.',
                },
            }
        },
        contactNumber: {
            type: 'string',
            regex: /^[0-9]{10}$/,
            errorMessage: 'Invalid contact number. Must be 10 digits.',
        },
        email: {
            type: 'string',
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Invalid email address.',
        },
        website: {
            type: 'string',
            regex: /^www\.[a-zA-Z0-9]+\.[a-zA-Z]+$/,
            errorMessage: 'Invalid website address.',
        },
        foundedYear: {
            type: 'number',
            regex: /^\d{4}$/,
            errorMessage: 'Invalid founded year. Must be 4 digits.',
        },
        principalName: {
            type: 'string',
            regex: /^[a-zA-Z\s]+$/,
            errorMessage: 'Invalid principal name. Only letters and spaces are allowed.',
        },
        totalStudents: {
            type: 'number',
            regex: /^\d+$/,
            errorMessage: 'Invalid total students. Must be a number.',
        },
        phoneNumber: {
            type: 'string',
            regex: /^\d{10}$/,
            errorMessage: 'Invalid phone number. Must be 10 digits.',
        },
        password: {
            type: 'string',
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!^&*()])[A-Za-z\d$#@!^&*()]{8,}$/,
            errorMessage: 'Invalid password. Minimum 8 characters, at least one letter, one number, and one special character ($#@!^&*()).',
        },
        
    };

    _validation = (data) => {
        const errors = {};
        const validatorRules = this.#validatorRules;
        for (let key in validatorRules) {
            const rule = validatorRules[key];
            const value = data[key];
            if (rule.type === 'object') {
                if (value) {
                    const objectErrors = this._validateObject(value, rule.properties);
                    if (Object.keys(objectErrors).length > 0) {
                        errors[key] = objectErrors;
                    }
                } else {
                    errors[key] = 'Value is required.';
                }
            } else {
                
                if (rule.required && (value === null || value === undefined || value === '')) {
                    errors[key] = 'Value is required.';
                    continue;
                }

                if (rule.type && typeof value !== rule.type) {
                    errors[key] = `Invalid data type. Expected ${rule.type}.`;
                    continue;
                }

                if (value && !rule.regex.test(value)) {
                    errors[key] = rule.errorMessage;
                }
            }
        }

        return errors;
    }

    _validateObject = (obj, rules) => {
        const errors = {};
        for (let key in rules) {
            const rule = rules[key];
            const value = obj[key];

            if (rule.required && (value === null || value === undefined || value === '')) {
                errors[key] = 'Value is required.';
                continue;
            }

            if (rule.type && typeof value !== rule.type) {
                errors[key] = `Invalid data type. Expected ${rule.type}.`;
                continue;
            }

            if (value && !rule.regex.test(value)) {
                errors[key] = rule.errorMessage;
            }
        }

        return errors;
    }
}

export { SchoolModel };
