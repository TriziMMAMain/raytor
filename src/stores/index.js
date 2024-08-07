import {defineStore} from 'pinia'
import {ref} from 'vue'
import interceptors from "../api.js";
import _ from "lodash";
import {ProcessingError} from "../notification/toasting.js";

export const useStore = defineStore('store', () => {
    // state
    const products = ref(null)
    const productsPage = ref(null)
    const productId = ref(null)
    const address = ref(null)

    // action

    async function fetchAllProducts() {
        // products.value = [
        // {
        //     id: 12554124,
        //     mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
        //     photo: [
        //         'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
        //         'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
        //         'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
        //     ],
        //     title: 'DEZEGA self-contained self-rescuer CARBO 30',
        //     text: 'This self-rescuer is particularly suitable for short evacuation routes and has the lightest weight among the 30-minute...',
        //     textDescription: 'This self-rescuer is particularly suitable for short evacuation routes and has the lightest weight among the 30-minute self-rescuers by DEZEGA. It can be worn either on the waist belt or on the shoulder straps, providing comfortable breathing during evacuation. The activation procedure is identical to the CARBO 60, which has already established itself in the market. The starting device activates immediately upon lid removal, allowing the user to start breathing within the first few seconds after activation.',
        //     textDescripitonLi: [
        //         {
        //             textUl: 'Ergonomics during everyday carrying:',
        //             textLi: [
        //                 'large area of contact with the user',
        //                 'balanced weight distribution',
        //                 'comfortable shoulder belt',
        //                 'suitable for use with most types of waist belts',
        //             ],
        //         },
        //         {
        //             textUl: 'Comfortable breathing:',
        //             textLi: [
        //                 'low heat capacity of the inhaled gas', 'low breathing resistance', 'low temperature of the inhaled gas'
        //             ],
        //         }
        //     ],
        //     textDescriptionP: [
        //         'An automatic starter that activates during lid removal',
        //         'The training unit is available for practicing donning and breathing techniques',
        //         'Elimination of initial loss of oxygen volume',
        //         'The layout method keeps the breathing system from being damaged or stuck together',
        //         'Starter operates in wide temperature ranges',
        //         'The relief valve is located in a protected place',
        //         'Elimination of leakage due to spring-loaded tensioning coupling straps',
        //         'Possibility to perform minor repairs directly at the mine (belt loops and bumpers replacement)',
        //         'There is a lightweight version available for use with a pouch.'
        //     ],
        //     feature: [
        //         {
        //             featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
        //             featureValue: '',
        //         },
        //         {
        //             featureText: '- 10 l/min',
        //             featureValue: '90 min',
        //         },
        //         {
        //             featureText: '- 35 l/min',
        //             featureValue: '30 min',
        //         },
        //         {
        //             featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
        //             featureValue: '1,0 kPa',
        //         },
        //         {
        //             featureText: 'The temperature of the inhaled gas, °C, not more',
        //             featureValue: '50 °С',
        //         },
        //         {
        //             featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
        //             featureValue: '21%',
        //         },
        //         {
        //             featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
        //             featureValue: '3%',
        //         },
        //         {
        //             featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
        //             featureValue: '1,5%',
        //         },
        //         {
        //             featureText: 'The volume of the breathing bag, not less',
        //             featureValue: '6 L',
        //         },
        //         {
        //             featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
        //             featureValue: '',
        //         },
        //     ],
        //     order: [
        //         {
        //             orderText: 'CARBO 30',
        //             orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
        //         },
        //         {
        //             orderText: 'CARBO-30T',
        //             orderValue: 'T-0MP0-ISG-EUENEU-WK',
        //         },
        //         {
        //             orderText: 'Shoulder belt',
        //             orderValue: 'SKTB.02.KPP.00.00.000-07',
        //         },
        //         {
        //             orderText: 'Waist belt',
        //             orderValue: 'DWB.45.00.000',
        //         },
        //         {
        //             orderText: 'Front bumper',
        //             orderValue: 'SKTB.02.CK5.00.00.006',
        //         },
        //         {
        //             orderText: 'Rear bumper',
        //             orderValue: 'SKTB.02.CK5.00.00.003',
        //         },
        //         {
        //             orderText: 'Belt loops',
        //             orderValue: 'SKTB.02.CK5.00.00.004',
        //         },
        //         {
        //             orderText: 'Belt loops fixators set',
        //             orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
        //         }
        //     ],
        //     available: true,
        //     standard: 'EN',
        //     manufacturer: 'DEZEGA SP',
        //     field: 'SCSR'
        // },
        //     {
        //         id: 91253672,
        //         mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
        //         photo: [
        //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
        //             'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
        //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
        //         ],
        //         title: 'Compressed oxygen self-contained closed-circuit breathing apparatus DEZEGA P-70',
        //         text: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus...',
        //         textDescription: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus. P-70 is the next-generation positive pressure breathing apparatus designed based on new safety and production principles. With new materials and high-tech design solutions, DEZEGA has significantly improved the technical characteristics and reliability of the breathing apparatus.',
        //         textDescripitonLi: [
        //             {
        //                 textUl: 'Ergonomics during everyday carrying:',
        //                 textLi: [
        //                     'Nominal working duration of 4 hours.',
        //                     'Positive pressure in the breathing circuit',
        //                     'Lightest and smallest on the market',
        //                     'Robust casing',
        //                     'Simple and reliable mechanical structure based on 37 years of experience',
        //                     'Possible to change cooling elements without doffing the breathing apparatus',
        //                     'Automatic control and alarm system',
        //                     'Estimated duration time calculation',
        //                     'Personal ID card, data collection and sharing',
        //                     'Ergonomic harness system',
        //                     'Does not require special tools for assembling and daily maintenance',
        //                     'Low total cost of ownership'
        //                 ],
        //             },
        //         ],
        //         textDescriptionP: [
        //             'Compressed oxygen self-contained closed-circuit breathing apparatus P-70 is enhanced by smart onboard electronics,',
        //             'which provides a self-checks, warnings and alarms when there is a risk for the user,',
        //             'monitors the team status via special RFID tags with unique code of the user,',
        //             'and also calculate the estimate working duration.',
        //             'With high contrast, full-color display, user data is visible even in the most difficult environments such as darkness,',
        //             'bright sunlight, or smoke.',
        //             'Design of breathing apparatus allows user to assemble,',
        //             'disassemble and maintain the unit without any tools.',
        //             'A special fireproof and comfortable harness system with lumbar rotation allows the user to choose the height of the waist belt,',
        //             'and rotate the belt to not shift the center of gravity and facilitate the work to the user.'
        //         ],
        //         feature: [
        //             {
        //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
        //                 featureValue: '',
        //             },
        //             {
        //                 featureText: '- 10 l/min',
        //                 featureValue: '90 min',
        //             },
        //             {
        //                 featureText: '- 35 l/min',
        //                 featureValue: '30 min',
        //             },
        //             {
        //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
        //                 featureValue: '1,0 kPa',
        //             },
        //             {
        //                 featureText: 'The temperature of the inhaled gas, °C, not more',
        //                 featureValue: '50 °С',
        //             },
        //             {
        //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
        //                 featureValue: '21%',
        //             },
        //             {
        //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
        //                 featureValue: '3%',
        //             },
        //             {
        //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
        //                 featureValue: '1,5%',
        //             },
        //             {
        //                 featureText: 'The volume of the breathing bag, not less',
        //                 featureValue: '6 L',
        //             },
        //             {
        //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
        //                 featureValue: '',
        //             },
        //         ],
        //         order: [
        //             {
        //                 orderText: 'CARBO 30',
        //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
        //             },
        //             {
        //                 orderText: 'CARBO-30T',
        //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
        //             },
        //             {
        //                 orderText: 'Shoulder belt',
        //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
        //             },
        //             {
        //                 orderText: 'Waist belt',
        //                 orderValue: 'DWB.45.00.000',
        //             },
        //             {
        //                 orderText: 'Front bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.006',
        //             },
        //             {
        //                 orderText: 'Rear bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.003',
        //             },
        //             {
        //                 orderText: 'Belt loops',
        //                 orderValue: 'SKTB.02.CK5.00.00.004',
        //             },
        //             {
        //                 orderText: 'Belt loops fixators set',
        //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
        //             }
        //         ],
        //         available: true,
        //         // standard: 'EN',
        //         standard: 'IS',
        //         manufacturer: 'DEZEGA SP',
        //         field: 'Closed-circuit SCBA'
        //     },
        //     {
        //         id: 53246346,
        //         mainPhoto: 'https://image.ec21.com/image/dezega/oimg_GC09983402_CA09983414/DEZEGA-Compressed-Oxygen-Self-contained-Closed-circuit-Breathing-Apparatus--P-30EX.jpg',
        //         photo: [
        //             'https://image.ec21.com/image/dezega/oimg_GC09983402_CA09983414/DEZEGA-Compressed-Oxygen-Self-contained-Closed-circuit-Breathing-Apparatus--P-30EX.jpg',
        //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg',
        //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
        //         ],
        //         title: 'Compressed oxygen self-contained closed-circuit breathing apparatus DEZEGA CARBO-60',
        //         text: 'The CARBO-60 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus...',
        //         textDescription: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus. P-70 is the next-generation positive pressure breathing apparatus designed based on new safety and production principles. With new materials and high-tech design solutions, DEZEGA has significantly improved the technical characteristics and reliability of the breathing apparatus.',
        //         textDescripitonLi: [
        //             {
        //                 textUl: 'Ergonomics during everyday carrying:',
        //                 textLi: [
        //                     'Nominal working duration of 4 hours.',
        //                     'Positive pressure in the breathing circuit',
        //                     'Lightest and smallest on the market',
        //                     'Robust casing',
        //                     'Simple and reliable mechanical structure based on 37 years of experience',
        //                     'Possible to change cooling elements without doffing the breathing apparatus',
        //                     'Automatic control and alarm system',
        //                     'Estimated duration time calculation',
        //                     'Personal ID card, data collection and sharing',
        //                     'Ergonomic harness system',
        //                     'Does not require special tools for assembling and daily maintenance',
        //                     'Low total cost of ownership'
        //                 ],
        //             },
        //         ],
        //         textDescriptionP: [
        //             'Compressed oxygen self-contained closed-circuit breathing apparatus P-70 is enhanced by smart onboard electronics,',
        //             'which provides a self-checks, warnings and alarms when there is a risk for the user,',
        //             'monitors the team status via special RFID tags with unique code of the user,',
        //             'and also calculate the estimate working duration.',
        //             'With high contrast, full-color display, user data is visible even in the most difficult environments such as darkness,',
        //             'bright sunlight, or smoke.',
        //             'Design of breathing apparatus allows user to assemble,',
        //             'disassemble and maintain the unit without any tools.',
        //             'A special fireproof and comfortable harness system with lumbar rotation allows the user to choose the height of the waist belt,',
        //             'and rotate the belt to not shift the center of gravity and facilitate the work to the user.'
        //         ],
        //         feature: [
        //             {
        //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
        //                 featureValue: '',
        //             },
        //             {
        //                 featureText: '- 10 l/min',
        //                 featureValue: '90 min',
        //             },
        //             {
        //                 featureText: '- 35 l/min',
        //                 featureValue: '30 min',
        //             },
        //             {
        //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
        //                 featureValue: '1,0 kPa',
        //             },
        //             {
        //                 featureText: 'The temperature of the inhaled gas, °C, not more',
        //                 featureValue: '50 °С',
        //             },
        //             {
        //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
        //                 featureValue: '21%',
        //             },
        //             {
        //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
        //                 featureValue: '3%',
        //             },
        //             {
        //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
        //                 featureValue: '1,5%',
        //             },
        //             {
        //                 featureText: 'The volume of the breathing bag, not less',
        //                 featureValue: '6 L',
        //             },
        //             {
        //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
        //                 featureValue: '',
        //             },
        //         ],
        //         order: [
        //             {
        //                 orderText: 'CARBO 30',
        //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
        //             },
        //             {
        //                 orderText: 'CARBO-30T',
        //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
        //             },
        //             {
        //                 orderText: 'Shoulder belt',
        //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
        //             },
        //             {
        //                 orderText: 'Waist belt',
        //                 orderValue: 'DWB.45.00.000',
        //             },
        //             {
        //                 orderText: 'Front bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.006',
        //             },
        //             {
        //                 orderText: 'Rear bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.003',
        //             },
        //             {
        //                 orderText: 'Belt loops',
        //                 orderValue: 'SKTB.02.CK5.00.00.004',
        //             },
        //             {
        //                 orderText: 'Belt loops fixators set',
        //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
        //             }
        //         ],
        //         available: true,
        //         standard: 'EN',
        //         manufacturer: 'DEZEGA SP',
        //         field: 'SCSR'
        //     },
        //     {
        //         id: 12554125,
        //         mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
        //         photo: [
        //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
        //             'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
        //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
        //         ],
        //         title: 'Training self-rescuer DEZEGA CARBO-30T',
        //         text: 'The CARBO-30T training self-rescuer is intended for training purposes, including practicing donning, breathing...',
        //         textDescription: 'The CARBO-30T training self-rescuer is intended for training purposes, including practicing donning, breathing resistance, studying design, operational principles, and proper usage of the CARBO 30 self-contained self-rescuer. SUPPLY OPTIONS FOR CARBO-30T (in basic configuration) - with a dummy cartridge and replaceable heat and moisture exchangers (HMEs) with mouthpiece plugs for training the donning procedure.',
        //         textDescripitonLi: [
        //             {
        //                 textUl: 'FEATURES AND ADVANTAGES:',
        //                 textLi: [
        //                     'Reusable casing',
        //                     'Quick and easy laying and preparation for the next training exercise',
        //                     'Full replication of handling the apparatus and donning simulation',
        //                     'Possibility to train with bumper and belt loops replacement',
        //                     'Breathing occurs through the opening in the HME',
        //                     'Economical and inexpensive for daily maintenance',
        //                     'No need for complex tools for assembly',
        //                 ],
        //             },
        //         ],
        //         textDescriptionP: [],
        //         feature: [
        //             {
        //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
        //                 featureValue: '',
        //             },
        //             {
        //                 featureText: '- 10 l/min',
        //                 featureValue: '90 min',
        //             },
        //             {
        //                 featureText: '- 35 l/min',
        //                 featureValue: '30 min',
        //             },
        //             {
        //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
        //                 featureValue: '1,0 kPa',
        //             },
        //             {
        //                 featureText: 'The temperature of the inhaled gas, °C, not more',
        //                 featureValue: '50 °С',
        //             },
        //             {
        //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
        //                 featureValue: '21%',
        //             },
        //             {
        //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
        //                 featureValue: '3%',
        //             },
        //             {
        //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
        //                 featureValue: '1,5%',
        //             },
        //             {
        //                 featureText: 'The volume of the breathing bag, not less',
        //                 featureValue: '6 L',
        //             },
        //             {
        //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
        //                 featureValue: '',
        //             },
        //         ],
        //         order: [
        //             {
        //                 orderText: 'CARBO 30',
        //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
        //             },
        //             {
        //                 orderText: 'CARBO-30T',
        //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
        //             },
        //             {
        //                 orderText: 'Shoulder belt',
        //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
        //             },
        //             {
        //                 orderText: 'Waist belt',
        //                 orderValue: 'DWB.45.00.000',
        //             },
        //             {
        //                 orderText: 'Front bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.006',
        //             },
        //             {
        //                 orderText: 'Rear bumper',
        //                 orderValue: 'SKTB.02.CK5.00.00.003',
        //             },
        //             {
        //                 orderText: 'Belt loops',
        //                 orderValue: 'SKTB.02.CK5.00.00.004',
        //             },
        //             {
        //                 orderText: 'Belt loops fixators set',
        //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
        //             }
        //         ],
        //         available: true,
        //         standard: 'EN',
        //         manufacturer: 'DONSORB',
        //         field: 'SCSR'
        //     },
        //
        // ]

        //     localStorage.setItem("products", JSON.stringify(products.value))

        try {
            const response = await interceptors.get('/posts/')
                .then((response) => {
                    products.value = _.filter(response.data, { hide: false })
                    // products.value = response.data
                })
                .catch((e) => {
                    console.log(e);
                    ProcessingError('Error ' + e)
                })
            localStorage.setItem("products", JSON.stringify(products.value))
            console.log(products.value);
        } catch (e) {
            console.log(e);
        }
    }
    async function fetchIdProduct(id) {
        try {
            console.log(id.id);
            const idNumber = ref(Number(id.id))
            const productsCopy2 = ref(null)
            const response = await interceptors.get(`/posts/${idNumber.value}`)
                .then((response) => {
                    productsCopy2.value = [response.data]
                })
                .catch((e) => {
                    ProcessingError('Error ' + e)
                })
            localStorage.setItem('productId', JSON.stringify(productsCopy2.value))
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchPageProduct(page) {
        try {


            const pageCopy = ref(0)
            if (page === 1) {
                pageCopy.value = 0
            } else if (page === 2) {
                pageCopy.value = 6
            } else if (page === 3) {
                pageCopy.value = 12
            } else if (page === 4) {
                pageCopy.value = 18
            } else if (page === 5) {
                pageCopy.value = 24
            } else if (page === 6) {
                pageCopy.value = 30
            } else if (page === 7) {
                pageCopy.value = 36
            } else if (page === 8) {
                pageCopy.value = 42
            } else if (page === 9) {
                pageCopy.value = 48
            } else if (page === 10) {
                pageCopy.value = 54
            }

            const response = await interceptors.get(`/paginated?limit=6&offset=${pageCopy.value}`)
                .then((response) => {
                    productsPage.value = _.filter(response.data, { hide: false })
                })
                .catch((e) => {
                    ProcessingError('Error ' + e)
                })
            if (productsPage.value.length === 1) {
                const response = await interceptors.get(`/paginated?limit=11&offset=${pageCopy.value}`)
                    .then((response) => {
                        productsPage.value = _.filter(response.data, { hide: false })
                    })
                    .catch((e) => {
                        ProcessingError('Error ' + e)
                    })
            } else if (productsPage.value.length === 2) {
                const response = await interceptors.get(`/paginated?limit=10&offset=${pageCopy.value}`)
                    .then((response) => {
                        productsPage.value = _.filter(response.data, { hide: false })
                    })
                    .catch((e) => {
                        ProcessingError('Error ' + e)
                    })
            } else if (productsPage.value.length === 3) {
                const response = await interceptors.get(`/paginated?limit=9&offset=${pageCopy.value}`)
                    .then((response) => {
                        productsPage.value = _.filter(response.data, { hide: false })
                    })
                    .catch((e) => {
                        ProcessingError('Error ' + e)
                    })
            } else if (productsPage.value.length === 4) {
                const response = await interceptors.get(`/paginated?limit=8&offset=${pageCopy.value}`)
                    .then((response) => {
                        productsPage.value = _.filter(response.data, { hide: false })
                    })
                    .catch((e) => {
                        ProcessingError('Error ' + e)
                    })
            } else if (productsPage.value.length === 5) {
                const response = await interceptors.get(`/paginated?limit=7&offset=${pageCopy.value}`)
                    .then((response) => {
                        productsPage.value = _.filter(response.data, { hide: false })
                    })
                    .catch((e) => {
                        ProcessingError('Error ' + e)
                    })
            }
            localStorage.setItem("products-page", JSON.stringify(productsPage.value))
            console.log(productsPage.value);
        } catch (e) {
            console.log(e);
        }
    }
    async function fetchAddress() {
        try {
            const response = await interceptors.get('/addresses')
                .then((response) => {
                    address.value = response.data

                })
                .catch((e) => {
                    ProcessingError('Error ' + e)
                })
            console.log(address.value);
            localStorage.setItem('address', JSON.stringify(address.value))

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // getters
    return {products, productId, productsPage, fetchAllProducts, fetchIdProduct, fetchAddress, fetchPageProduct}
})


    // [
    // {
    //     id: 12554124,
    //     mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
    //     photo: [
    //         'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
    //         'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
    //         'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
    //     ],
    //     title: 'DEZEGA self-contained self-rescuer CARBO 30',
    //     text: 'This self-rescuer is particularly suitable for short evacuation routes and has the lightest weight among the 30-minute...',
    //     textDescription: 'This self-rescuer is particularly suitable for short evacuation routes and has the lightest weight among the 30-minute self-rescuers by DEZEGA. It can be worn either on the waist belt or on the shoulder straps, providing comfortable breathing during evacuation. The activation procedure is identical to the CARBO 60, which has already established itself in the market. The starting device activates immediately upon lid removal, allowing the user to start breathing within the first few seconds after activation.',
    //     textDescripitonLi: [
    //         {
    //             textUl: 'Ergonomics during everyday carrying:',
    //             textLi: [
    //                 'large area of contact with the user',
    //                 'balanced weight distribution',
    //                 'comfortable shoulder belt',
    //                 'suitable for use with most types of waist belts',
    //             ],
    //         },
    //         {
    //             textUl: 'Comfortable breathing:',
    //             textLi: [
    //                 'low heat capacity of the inhaled gas', 'low breathing resistance', 'low temperature of the inhaled gas'
    //             ],
    //         }
    //     ],
    //     textDescriptionP: [
    //         'An automatic starter that activates during lid removal',
    //         'The training unit is available for practicing donning and breathing techniques',
    //         'Elimination of initial loss of oxygen volume',
    //         'The layout method keeps the breathing system from being damaged or stuck together',
    //         'Starter operates in wide temperature ranges',
    //         'The relief valve is located in a protected place',
    //         'Elimination of leakage due to spring-loaded tensioning coupling straps',
    //         'Possibility to perform minor repairs directly at the mine (belt loops and bumpers replacement)',
    //         'There is a lightweight version available for use with a pouch.'
    //     ],
    //     feature: [
    //         {
    //             featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
    //             featureValue: '',
    //         },
    //         {
    //             featureText: '- 10 l/min',
    //             featureValue: '90 min',
    //         },
    //         {
    //             featureText: '- 35 l/min',
    //             featureValue: '30 min',
    //         },
    //         {
    //             featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
    //             featureValue: '1,0 kPa',
    //         },
    //         {
    //             featureText: 'The temperature of the inhaled gas, °C, not more',
    //             featureValue: '50 °С',
    //         },
    //         {
    //             featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
    //             featureValue: '21%',
    //         },
    //         {
    //             featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
    //             featureValue: '3%',
    //         },
    //         {
    //             featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
    //             featureValue: '1,5%',
    //         },
    //         {
    //             featureText: 'The volume of the breathing bag, not less',
    //             featureValue: '6 L',
    //         },
    //         {
    //             featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
    //             featureValue: '',
    //         },
    //     ],
    //     order: [
    //         {
    //             orderText: 'CARBO 30',
    //             orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
    //         },
    //         {
    //             orderText: 'CARBO-30T',
    //             orderValue: 'T-0MP0-ISG-EUENEU-WK',
    //         },
    //         {
    //             orderText: 'Shoulder belt',
    //             orderValue: 'SKTB.02.KPP.00.00.000-07',
    //         },
    //         {
    //             orderText: 'Waist belt',
    //             orderValue: 'DWB.45.00.000',
    //         },
    //         {
    //             orderText: 'Front bumper',
    //             orderValue: 'SKTB.02.CK5.00.00.006',
    //         },
    //         {
    //             orderText: 'Rear bumper',
    //             orderValue: 'SKTB.02.CK5.00.00.003',
    //         },
    //         {
    //             orderText: 'Belt loops',
    //             orderValue: 'SKTB.02.CK5.00.00.004',
    //         },
    //         {
    //             orderText: 'Belt loops fixators set',
    //             orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
    //         }
    //     ],
    //     available: true,
    //     standard: 'EN',
    //     manufacturer: 'DEZEGA SP',
    //     field: 'SCSR'
    // },
    //     {
    //         id: 91253672,
    //         mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
    //         photo: [
    //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
    //             'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
    //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
    //         ],
    //         title: 'Compressed oxygen self-contained closed-circuit breathing apparatus DEZEGA P-70',
    //         text: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus...',
    //         textDescription: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus. P-70 is the next-generation positive pressure breathing apparatus designed based on new safety and production principles. With new materials and high-tech design solutions, DEZEGA has significantly improved the technical characteristics and reliability of the breathing apparatus.',
    //         textDescripitonLi: [
    //             {
    //                 textUl: 'Ergonomics during everyday carrying:',
    //                 textLi: [
    //                     'Nominal working duration of 4 hours.',
    //                     'Positive pressure in the breathing circuit',
    //                     'Lightest and smallest on the market',
    //                     'Robust casing',
    //                     'Simple and reliable mechanical structure based on 37 years of experience',
    //                     'Possible to change cooling elements without doffing the breathing apparatus',
    //                     'Automatic control and alarm system',
    //                     'Estimated duration time calculation',
    //                     'Personal ID card, data collection and sharing',
    //                     'Ergonomic harness system',
    //                     'Does not require special tools for assembling and daily maintenance',
    //                     'Low total cost of ownership'
    //                 ],
    //             },
    //         ],
    //         textDescriptionP: [
    //             'Compressed oxygen self-contained closed-circuit breathing apparatus P-70 is enhanced by smart onboard electronics,',
    //             'which provides a self-checks, warnings and alarms when there is a risk for the user,',
    //             'monitors the team status via special RFID tags with unique code of the user,',
    //             'and also calculate the estimate working duration.',
    //             'With high contrast, full-color display, user data is visible even in the most difficult environments such as darkness,',
    //             'bright sunlight, or smoke.',
    //             'Design of breathing apparatus allows user to assemble,',
    //             'disassemble and maintain the unit without any tools.',
    //             'A special fireproof and comfortable harness system with lumbar rotation allows the user to choose the height of the waist belt,',
    //             'and rotate the belt to not shift the center of gravity and facilitate the work to the user.'
    //         ],
    //         feature: [
    //             {
    //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
    //                 featureValue: '',
    //             },
    //             {
    //                 featureText: '- 10 l/min',
    //                 featureValue: '90 min',
    //             },
    //             {
    //                 featureText: '- 35 l/min',
    //                 featureValue: '30 min',
    //             },
    //             {
    //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
    //                 featureValue: '1,0 kPa',
    //             },
    //             {
    //                 featureText: 'The temperature of the inhaled gas, °C, not more',
    //                 featureValue: '50 °С',
    //             },
    //             {
    //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
    //                 featureValue: '21%',
    //             },
    //             {
    //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
    //                 featureValue: '3%',
    //             },
    //             {
    //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
    //                 featureValue: '1,5%',
    //             },
    //             {
    //                 featureText: 'The volume of the breathing bag, not less',
    //                 featureValue: '6 L',
    //             },
    //             {
    //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
    //                 featureValue: '',
    //             },
    //         ],
    //         order: [
    //             {
    //                 orderText: 'CARBO 30',
    //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
    //             },
    //             {
    //                 orderText: 'CARBO-30T',
    //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
    //             },
    //             {
    //                 orderText: 'Shoulder belt',
    //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
    //             },
    //             {
    //                 orderText: 'Waist belt',
    //                 orderValue: 'DWB.45.00.000',
    //             },
    //             {
    //                 orderText: 'Front bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.006',
    //             },
    //             {
    //                 orderText: 'Rear bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.003',
    //             },
    //             {
    //                 orderText: 'Belt loops',
    //                 orderValue: 'SKTB.02.CK5.00.00.004',
    //             },
    //             {
    //                 orderText: 'Belt loops fixators set',
    //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
    //             }
    //         ],
    //         available: true,
    //         // standard: 'EN',
    //         standard: 'IS',
    //         manufacturer: 'DEZEGA SP',
    //         field: 'Closed-circuit SCBA'
    //     },
    //     {
    //         id: 53246346,
    //         mainPhoto: 'https://image.ec21.com/image/dezega/oimg_GC09983402_CA09983414/DEZEGA-Compressed-Oxygen-Self-contained-Closed-circuit-Breathing-Apparatus--P-30EX.jpg',
    //         photo: [
    //             'https://image.ec21.com/image/dezega/oimg_GC09983402_CA09983414/DEZEGA-Compressed-Oxygen-Self-contained-Closed-circuit-Breathing-Apparatus--P-30EX.jpg',
    //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg',
    //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/5/3/3/53320b5c13d998c00c7de653d3f1d9c9888bb770/dezega_slide_6.jpg',
    //         ],
    //         title: 'Compressed oxygen self-contained closed-circuit breathing apparatus DEZEGA CARBO-60',
    //         text: 'The CARBO-60 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus...',
    //         textDescription: 'The P-70 is a respiratory protection device - compressed oxygen self-contained closed-circuit breathing apparatus. P-70 is the next-generation positive pressure breathing apparatus designed based on new safety and production principles. With new materials and high-tech design solutions, DEZEGA has significantly improved the technical characteristics and reliability of the breathing apparatus.',
    //         textDescripitonLi: [
    //             {
    //                 textUl: 'Ergonomics during everyday carrying:',
    //                 textLi: [
    //                     'Nominal working duration of 4 hours.',
    //                     'Positive pressure in the breathing circuit',
    //                     'Lightest and smallest on the market',
    //                     'Robust casing',
    //                     'Simple and reliable mechanical structure based on 37 years of experience',
    //                     'Possible to change cooling elements without doffing the breathing apparatus',
    //                     'Automatic control and alarm system',
    //                     'Estimated duration time calculation',
    //                     'Personal ID card, data collection and sharing',
    //                     'Ergonomic harness system',
    //                     'Does not require special tools for assembling and daily maintenance',
    //                     'Low total cost of ownership'
    //                 ],
    //             },
    //         ],
    //         textDescriptionP: [
    //             'Compressed oxygen self-contained closed-circuit breathing apparatus P-70 is enhanced by smart onboard electronics,',
    //             'which provides a self-checks, warnings and alarms when there is a risk for the user,',
    //             'monitors the team status via special RFID tags with unique code of the user,',
    //             'and also calculate the estimate working duration.',
    //             'With high contrast, full-color display, user data is visible even in the most difficult environments such as darkness,',
    //             'bright sunlight, or smoke.',
    //             'Design of breathing apparatus allows user to assemble,',
    //             'disassemble and maintain the unit without any tools.',
    //             'A special fireproof and comfortable harness system with lumbar rotation allows the user to choose the height of the waist belt,',
    //             'and rotate the belt to not shift the center of gravity and facilitate the work to the user.'
    //         ],
    //         feature: [
    //             {
    //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
    //                 featureValue: '',
    //             },
    //             {
    //                 featureText: '- 10 l/min',
    //                 featureValue: '90 min',
    //             },
    //             {
    //                 featureText: '- 35 l/min',
    //                 featureValue: '30 min',
    //             },
    //             {
    //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
    //                 featureValue: '1,0 kPa',
    //             },
    //             {
    //                 featureText: 'The temperature of the inhaled gas, °C, not more',
    //                 featureValue: '50 °С',
    //             },
    //             {
    //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
    //                 featureValue: '21%',
    //             },
    //             {
    //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
    //                 featureValue: '3%',
    //             },
    //             {
    //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
    //                 featureValue: '1,5%',
    //             },
    //             {
    //                 featureText: 'The volume of the breathing bag, not less',
    //                 featureValue: '6 L',
    //             },
    //             {
    //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
    //                 featureValue: '',
    //             },
    //         ],
    //         order: [
    //             {
    //                 orderText: 'CARBO 30',
    //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
    //             },
    //             {
    //                 orderText: 'CARBO-30T',
    //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
    //             },
    //             {
    //                 orderText: 'Shoulder belt',
    //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
    //             },
    //             {
    //                 orderText: 'Waist belt',
    //                 orderValue: 'DWB.45.00.000',
    //             },
    //             {
    //                 orderText: 'Front bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.006',
    //             },
    //             {
    //                 orderText: 'Rear bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.003',
    //             },
    //             {
    //                 orderText: 'Belt loops',
    //                 orderValue: 'SKTB.02.CK5.00.00.004',
    //             },
    //             {
    //                 orderText: 'Belt loops fixators set',
    //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
    //             }
    //         ],
    //         available: true,
    //         standard: 'EN',
    //         manufacturer: 'DEZEGA SP',
    //         field: 'SCSR'
    //     },
    //     {
    //         id: 12554125,
    //         mainPhoto: 'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
    //         photo: [
    //             'https://en.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/6/9/b/69b60312361e0e07e9425a06c583cdf80208b700/dezega_slide_5.jpg',
    //             'https://static.wixstatic.com/media/c26854_e78c04ecc3cd449e9e07ae82369f2787~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg',
    //             'https://ru.tdspasatel.ru/htimg/display/item-attach-big/?relativePath=/upload/gaufrette/8/2/b/82bc56c4408e72961efe8a222a64a1b8ebf181c0/dezega_slide_7.jpg'
    //         ],
    //         title: 'Training self-rescuer DEZEGA CARBO-30T',
    //         text: 'The CARBO-30T training self-rescuer is intended for training purposes, including practicing donning, breathing...',
    //         textDescription: 'The CARBO-30T training self-rescuer is intended for training purposes, including practicing donning, breathing resistance, studying design, operational principles, and proper usage of the CARBO 30 self-contained self-rescuer. SUPPLY OPTIONS FOR CARBO-30T (in basic configuration) - with a dummy cartridge and replaceable heat and moisture exchangers (HMEs) with mouthpiece plugs for training the donning procedure.',
    //         textDescripitonLi: [
    //             {
    //                 textUl: 'FEATURES AND ADVANTAGES:',
    //                 textLi: [
    //                     'Reusable casing',
    //                     'Quick and easy laying and preparation for the next training exercise',
    //                     'Full replication of handling the apparatus and donning simulation',
    //                     'Possibility to train with bumper and belt loops replacement',
    //                     'Breathing occurs through the opening in the HME',
    //                     'Economical and inexpensive for daily maintenance',
    //                     'No need for complex tools for assembly',
    //                 ],
    //             },
    //         ],
    //         textDescriptionP: [],
    //         feature: [
    //             {
    //                 featureText: 'Rated duration in accordance with EN 13794:2002, IS 15803:2008 and AS/NZS 1716:2012 at lung ventilation, not less:',
    //                 featureValue: '',
    //             },
    //             {
    //                 featureText: '- 10 l/min',
    //                 featureValue: '90 min',
    //             },
    //             {
    //                 featureText: '- 35 l/min',
    //                 featureValue: '30 min',
    //             },
    //             {
    //                 featureText: 'Breathing resistance (at inhalation or exhalation) during operation, max',
    //                 featureValue: '1,0 kPa',
    //             },
    //             {
    //                 featureText: 'The temperature of the inhaled gas, °C, not more',
    //                 featureValue: '50 °С',
    //             },
    //             {
    //                 featureText: 'The volume of oxygen in the inhaled gas during the rated duration, not less',
    //                 featureValue: '21%',
    //             },
    //             {
    //                 featureText: 'The maximum volume fraction of carbon dioxide in the inhaled gas, not more',
    //                 featureValue: '3%',
    //             },
    //             {
    //                 featureText: 'The average volume fraction of carbon dioxide in the inhaled gas during the rated duration, not more',
    //                 featureValue: '1,5%',
    //             },
    //             {
    //                 featureText: 'The volume of the breathing bag, not less',
    //                 featureValue: '6 L',
    //             },
    //             {
    //                 featureText: 'Overall dimensions (without waist and shoulder straps or bag), standard configuration:',
    //                 featureValue: '',
    //             },
    //         ],
    //         order: [
    //             {
    //                 orderText: 'CARBO 30',
    //                 orderValue: 'S-30MP1-ISG-EUENEU-WK(O)',
    //             },
    //             {
    //                 orderText: 'CARBO-30T',
    //                 orderValue: 'T-0MP0-ISG-EUENEU-WK',
    //             },
    //             {
    //                 orderText: 'Shoulder belt',
    //                 orderValue: 'SKTB.02.KPP.00.00.000-07',
    //             },
    //             {
    //                 orderText: 'Waist belt',
    //                 orderValue: 'DWB.45.00.000',
    //             },
    //             {
    //                 orderText: 'Front bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.006',
    //             },
    //             {
    //                 orderText: 'Rear bumper',
    //                 orderValue: 'SKTB.02.CK5.00.00.003',
    //             },
    //             {
    //                 orderText: 'Belt loops',
    //                 orderValue: 'SKTB.02.CK5.00.00.004',
    //             },
    //             {
    //                 orderText: 'Belt loops fixators set',
    //                 orderValue: 'SKTB.02.CK5.00.00.005, SKTB.02.CK5.00.00.005-01',
    //             }
    //         ],
    //         available: true,
    //         standard: 'EN',
    //         manufacturer: 'DONSORB',
    //         field: 'SCSR'
    //     }
    // ]