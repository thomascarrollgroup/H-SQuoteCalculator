
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}



function updateCompanyTypeSuggestions() {
    const companyTypeInput = document.getElementById("companyType");
    const companyTypeOptions = document.getElementById("companyTypeOptions");

    const userInput = companyTypeInput.value.toLowerCase();
    const filteredTypes = companyTypes.filter((type) => type.toLowerCase().startsWith(userInput));

    const datalistOptions = filteredTypes.map((type) => `<option value="${type}">${type}</option>`).join("");

    companyTypeOptions.innerHTML = datalistOptions;
}

document.addEventListener("DOMContentLoaded", () => {
    const companyTypeInput = document.getElementById("companyType");

    const companyTypeOptions = document.createElement("datalist");
    companyTypeOptions.setAttribute("id", "companyTypeOptions");

    document.body.appendChild(companyTypeOptions);

    companyTypeInput.setAttribute("list", "companyTypeOptions");

    companyTypeInput.addEventListener("input", updateCompanyTypeSuggestions);

    document.getElementById("CalculateQuote").addEventListener("click", function (event) {
        event.preventDefault();
        const userInput = companyTypeInput.value.trim();
        const isValidType = companyTypes.includes(userInput);
        if (!isValidType) {
            alert("Please select a valid company type from the dropdown list.");
            document.getElementById("QuoteResults").style.display = "none";
            document.getElementById("ExtraHelp").style.display = "none";
            return;
        }
        validatePostcodeAndCalculateQuote();
    });
});


function validatePostcodeAndCalculateQuote() {
    const postcodeInput = document.getElementById("companyPostcode").value.trim().toUpperCase();
    const companyTypeInput = document.getElementById("companyType").value.trim().toLowerCase();

    const isCompanyTypeRestricted = restrictedCompanyTypes.includes(companyTypeInput);
    const isPostcodeRestricted = restrictedPostcodes.includes(postcodeInput);

    // If both company type and postcode are restricted
    if (isCompanyTypeRestricted && isPostcodeRestricted) {
        document.getElementById("RestrictedPostcode").style.display = "block";
        document.getElementById("RestrictedIndustry").style.display = "block";
        document.getElementById("QuoteResults").style.display = "none";
        return;
    }

    // If only company type is restricted
    if (isCompanyTypeRestricted) {
        document.getElementById("RestrictedIndustry").style.display = "block";
        document.getElementById("QuoteResults").style.display = "none";
    } else {
        document.getElementById("RestrictedIndustry").style.display = "none";
    }

    // If only postcode is restricted
    if (isPostcodeRestricted) {
        document.getElementById("QuoteResults").style.display = "none";
        document.getElementById("RestrictedPostcode").style.display = "block";
    } else {
        document.getElementById("RestrictedPostcode").style.display = "none";
    }

    // Check if the entered postcode is valid
    const isValidPostcode = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/.test(postcodeInput);
    if (!isValidPostcode) {
        document.getElementById("QuoteResults").style.display = "none";
        alert('Please enter a valid post code. For example: (AB12 C34)');
        return;
    }

    // If both company type and postcode are valid
    if (!isCompanyTypeRestricted && !isPostcodeRestricted) {
        calculateQuote();
    }
}

var goldMonthlyQuote;
var silverMonthlyQuote;
var bronzeMonthlyQuote;
var goldAnnualQuote;
var silverAnnualQuote;
var bronzeAnnualQuote;

function calculateQuote() {

    var companyName = document.getElementById("companyName").value;
    var companyPostcode = document.getElementById("companyPostcode").value;
    var companyType = document.getElementById("companyType").value;
    var numEmployees = parseInt(document.getElementById("numEmployees").value);


    if (!companyName || !companyPostcode || !companyType || isNaN(numEmployees) ) {
        alert("Please fill in all fields with valid information.");

    }

    else {
        document.getElementById("QuoteResults").style.display = "block";
        document.getElementById("ExtraHelp").style.display = "block";
        scrollToElement("ExtraHelp");
        document.body.style.overflow = "auto";
    }


    if (numEmployees > 0 && numEmployees <= 75) {
        goldMonthlyQuote = '\u00A3' + "294.44";
        goldAnnualQuote = '\u00A3' + "3249";
        silverMonthlyQuote = '\u00A3' + "137.30";
        silverAnnualQuote = '\u00A3' + "1515";
        bronzeMonthlyQuote = '\u00A3' + "67.97";
        bronzeAnnualQuote = '\u00A3' + "750";
        document.getElementById("AltQuoteResults").style.display = "none";

    } else if (numEmployees > 75 && numEmployees <= 150) {
        goldMonthlyQuote = '\u00A3' + "345.64";
        goldAnnualQuote = '\u00A3' + "3814";
        silverMonthlyQuote = '\u00A3' + "193.03";
        silverAnnualQuote = '\u00A3' + "2130";
        bronzeMonthlyQuote = '\u00A3' + "95.16";
        bronzeAnnualQuote = '\u00A3' + "1050";
        document.getElementById("AltQuoteResults").style.display = "none";

    } else if (numEmployees > 150 && numEmployees <= 250) {
        goldMonthlyQuote = '\u00A3' + "368.30";
        goldAnnualQuote = '\u00A3' + "4064";
        silverMonthlyQuote = '\u00A3' + "215.69";
        silverAnnualQuote = '\u00A3' + "2380";
        bronzeMonthlyQuote = '\u00A3' + "110.11";
        bronzeAnnualQuote =  '\u00A3' + "1215";
        document.getElementById("AltQuoteResults").style.display = "none";

    } else if (numEmployees > 250 && numEmployees <= 500) {
        goldMonthlyQuote = '\u00A3' + "423.58";
        goldAnnualQuote = '\u00A3' + "4674";
        silverMonthlyQuote = '\u00A3' + "270.97";
        silverAnnualQuote = '\u00A3' + "2990";
        bronzeMonthlyQuote = '\u00A3' + "126.88";
        bronzeAnnualQuote = '\u00A3' + "1400";
        document.getElementById("AltQuoteResults").style.display = "none";

    } else if (numEmployees > 500) {
        document.getElementById("QuoteResults").style.display = "none";
        document.getElementById("AltQuoteResults").style.display = "block";
    }

    document.getElementById("goldMonthlyQuoteResult").innerText = "Monthly Quote: " + goldMonthlyQuote;
    document.getElementById("goldAnnualQuoteResult").innerText = "Annual Quote: " + goldAnnualQuote;
    document.getElementById("silverMonthlyQuoteResult").innerText = "Monthly Quote: " + silverMonthlyQuote;
    document.getElementById("silverAnnualQuoteResult").innerText = "Annual Quote: " + silverAnnualQuote;
    document.getElementById("bronzeMonthlyQuoteResult").innerText = "Monthly Quote: " + bronzeMonthlyQuote;
    document.getElementById("bronzeAnnualQuoteResult").innerText = "Annual Quote: " + bronzeAnnualQuote;



}

function GOLDSelectButton() {
    document.getElementById("GOLDConfirm").style.display = "block";
    document.getElementById("SILVERConfirm").style.display = "none";
    document.getElementById("BRONZEConfirm").style.display = "none";

    document.getElementById("GOLDSelect").style.display = "none";
    document.getElementById("SILVERSelect").style.display = "block";
    document.getElementById("BRONZESelect").style.display = "block";

    document.getElementById("GOLDEdit").style.display = "block";
    document.getElementById("SILVEREdit").style.display = "none";
    document.getElementById("BRONZEEdit").style.display = "none";

    document.getElementById("CalculateQuote").style.display = "none";

    document.getElementById("GOLD").style.backgroundColor = "#d8232a";
    document.getElementById("GOLD").style.color = "white";
    document.getElementById("SILVER").style.backgroundColor = "white";
    document.getElementById("SILVER").style.color = "black";
    document.getElementById("BRONZE").style.backgroundColor = "white";
    document.getElementById("BRONZE").style.color = "black";


}
function SILVERSelectButton() {

    document.getElementById("SILVERConfirm").style.display = "block";
    document.getElementById("GOLDConfirm").style.display = "none";
    document.getElementById("BRONZEConfirm").style.display = "none";

    document.getElementById("SILVERSelect").style.display = "none";
    document.getElementById("GOLDSelect").style.display = "block";
    document.getElementById("BRONZESelect").style.display = "block";

    document.getElementById("GOLDEdit").style.display = "none";
    document.getElementById("SILVEREdit").style.display = "block";
    document.getElementById("BRONZEEdit").style.display = "none";

    document.getElementById("CalculateQuote").style.display = "none";

    document.getElementById("SILVER").style.backgroundColor = "#d8232a";
    document.getElementById("SILVER").style.color = "white";
    document.getElementById("GOLD").style.backgroundColor = "white";
    document.getElementById("GOLD").style.color = "black";
    document.getElementById("BRONZE").style.backgroundColor = "white";
    document.getElementById("BRONZE").style.color = "black";

}
function BRONZESelectButton() {
    document.getElementById("BRONZEConfirm").style.display = "block";
    document.getElementById("SILVERConfirm").style.display = "none";
    document.getElementById("GOLDConfirm").style.display = "none";

    document.getElementById("BRONZESelect").style.display = "none";
    document.getElementById("GOLDSelect").style.display = "block";
    document.getElementById("SILVERSelect").style.display = "block";

    document.getElementById("GOLDEdit").style.display = "none";
    document.getElementById("SILVEREdit").style.display = "none";
    document.getElementById("BRONZEEdit").style.display = "block";

    document.getElementById("CalculateQuote").style.display = "none";

    document.getElementById("BRONZE").style.backgroundColor = "#d8232a";
    document.getElementById("BRONZE").style.color = "white";
    document.getElementById("SILVER").style.backgroundColor = "white";
    document.getElementById("SILVER").style.color = "black";
    document.getElementById("GOLD").style.backgroundColor = "white";
    document.getElementById("GOLD").style.color = "black";

}

function Edit() {
    document.getElementById("CalculateQuote").style.display = "block";

    document.getElementById("BRONZEConfirm").style.display = "none";
    document.getElementById("SILVERConfirm").style.display = "none";
    document.getElementById("GOLDConfirm").style.display = "none";

    document.getElementById("BRONZESelect").style.display = "block";
    document.getElementById("GOLDSelect").style.display = "block";
    document.getElementById("SILVERSelect").style.display = "block";

    document.getElementById("BRONZE").style.border = "none";
    document.getElementById("GOLD").style.border = "none";
    document.getElementById("SILVER").style.border = "none";

    document.getElementById("GOLDEdit").style.display = "none";
    document.getElementById("SILVEREdit").style.display = "none";
    document.getElementById("BRONZEEdit").style.display = "none";

    scrollToElement("Heading");

}

function Confirm(service) {
    document.getElementById("QuoteResults").style.display = "none";
    document.getElementById("ConfirmationPage").style.display = "block";
    document.getElementById("FcompanyName").innerText = "Company Name: " + document.getElementById("companyName").value;
    document.getElementById("FcompanyPostcode").innerText = "Company Postcode: " + document.getElementById("companyPostcode").value;
    document.getElementById("FcompanyType").innerText = "Company Type: " + document.getElementById("companyType").value;
    document.getElementById("FnumEmployees").innerText = "Number of Employees: " + document.getElementById("numEmployees").value;
    document.getElementById("ChosenService").innerText = "Chosen service level: " + service;
    
    document.getElementById("EXIT").style.display = "block";

    document.getElementById("companyName").style.display = "none";
    document.getElementById("companyPostcode").style.display = "none";
    document.getElementById("companyType").style.display = "none";
    document.getElementById("numEmployees").style.display = "none";
    document.getElementById("CalculateQuote").style.display = "none";
    if (service == 'GOLD') {
        document.getElementById("MonthlyQuotes").innerText = "Monthly Quote:  " + goldMonthlyQuote;
        document.getElementById("AnnualQuotes").innerText = "Annual Quote:  " + goldAnnualQuote;
    }
    else if (service == 'SILVER') {
        document.getElementById("MonthlyQuotes").innerText = "Monthly Quote: " + silverMonthlyQuote;
        document.getElementById("AnnualQuotes").innerText = "Annual Quote: " + silverAnnualQuote;
    }
    else if (service == 'BRONZE') {
        document.getElementById("MonthlyQuotes").innerText = "Monthly Quote:  " + bronzeMonthlyQuote;
        document.getElementById("AnnualQuotes").innerText = "Annual Quote:  " + bronzeAnnualQuote;
    }
}
function Exit() {
    window.location.reload()
}


const restrictedPostcodes = ["CF23 2TR"]; //  add here
const restrictedCompanyTypes = ["accountancy", "abattoir"]; // add here


// edit or add here
const companyTypes = [
    "Abattoir",
    "Access Control & Door Entry System Installation, Service & Repair",
    "Accountancy",
    "Administrator",
    "Adult Education",
    "Adventure Playground",
    "Advertising",
    "Advertising Agency",
    "Advice Centre",
    "Aerial Erecting",
    "After Dinner Speaker",
    "Agricultural Consultancy",
    "Agricultural Contracting",
    "Agricultural Engineer",
    "Agricultural Machinery Installation, Service & Repair",
    "Agricultural Machinery Specialist",
    "Agricultural Society",
    "Agricultural/Horticultural Equipment Manufacturing",
    "Agriculture",
    "Air Brush Tanning",
    "Air Conditioning",
    "Air Conditioning &/Or Ventilation Installation, Service & Repair",
    "Air Conditioning Engineering",
    "Air Conditioning Installation - Domestic/Small Commercial Only",
    "Aircraft Service & Repair",
    "Airport Authority",
    "Alarm Installation, Service & Repair",
    "Alarm System Manufacturers",
    "Alternative & Complimentary Therapy",
    "Aluminium Manufacturers",
    "Aluminium Product Manufacturing",
    "Aluminium Stockholders",
    "Amateur Cricket Club",
    "Amateur Dramatic Society",
    "Amateur Football Club",
    "Amateur Rugby Club",
    "Ambulance Authority",
    "Amusement Arcade",
    "Amusement Machine Supplying",
    "Amusements",
    "Animal Welfare",
    "Aquarium Manufacturers (Glass And Wood)",
    "Arable Farming",
    "Arbitrator",
    "Arborist",
    "Architect",
    "Architectural Metalwork Fabrication & Installation",
    "Architectural Surveyor",
    "Art Gallery",
    "Artists Studio",
    "Arts And Craft Workshop",
    "Arts And Crafts Retailing",
    "Asbestos Removal",
    "Assessing",
    "Assisted Living Units",
    "Athletics Club",
    "Auctioneer",
    "Audio Visual Equipment Installation, Service & Repair",
    "Audio/Visual Media Hiring",
    "Audio/Visual Media Retailing",
    "Author",
    "Auto Electrician",
    "Automatic Gate & Barrier Installation, Service & Repair",
    "Aviation Consultancy",
    "Bakery",
    "Bakery Produce Manufacturing",
    "Bakery Produce Wholesaling",
    "Banking",
    "Barber",
    "Bathroom Furniture (Ceramic) Wholesalers",
    "Bathroom Installation",
    "Beautician",
    "Beauty Salon",
    "Beauty Therapy",
    "Bed & Breakfast Licensed",
    "Bed & Breakfast Unlicensed",
    "Bedding Wholesaling",
    "Biochemistry",
    "Biofuel Distributor",
    "Blind Installation",
    "Blind Installation, Service & Repair",
    "Boat Builders (Other)",
    "Boat Building Maintenance & Repairs",
    "Boat Hiring",
    "Boat Transporters",
    "Boiler Installation, Service & Repair",
    "Book & Magazine Distribution",
    "Bookkeeper",
    "Bookmaking - Off Course",
    "Bookselling",
    "Botanical Society",
    "Bottled Gas Wholesaling",
    "Bottlers &/Or Canners Drink",
    "Bowling Club",
    "Boxing Club",
    "Breakdown Recovery",
    "Brewery",
    "Bricklayer",
    "Bridal Wear Retailing",
    "Builder",
    "Builders - All Premises",
    "Builders - Alterations and Extensions",
    "Builders - Commercial Alteration And Repair",
    "Builders - Commercial New",
    "Builders - PDH Alteration and Repair",
    "Builders - PDH New",
    "Builders - Remedial Services",
    "Builders Joinery Manufacturing",
    "Builders Merchant",
    "Building Consultancy",
    "Building Contracting",
    "Building Maintenance",
    "Building Management",
    "Building Material Manufacturing Inc Plastic",
    "Building Society",
    "Building Society Agent",
    "Building Surveyor",
    "Business Advisor",
    "Business Advisory Service",
    "Business Coach",
    "Business Consulting",
    "Butcher",
    "Butchers - Wholesale",
    "Cafe",
    "Cafe (Ex Deep Fat Frying)",
    "Cake Manufacturing",
    "Call Centre",
    "Candle Wholesaling",
    "Car Accessory Dealing",
    "Car Body Repair",
    "Car Body Repairing",
    "Car Sales",
    "Caravan Manufacturing",
    "Caravan Service & Repair",
    "Caravan Site",
    "Caravan/Camping Site",
    "Card & Cardboard Manufacturing",
    "Care Home",
    "Carer",
    "Carpentry",
    "Carpentry & Joinery",
    "Carpet & Rug Wholesaling Inc Oriental",
    "Carpet Fitting",
    "Carpet Retailing",
    "Carpet Wholesaling",
    "Casino",
    "Caterer Operating From Vehicle Or Trailer",
    "Catering Consultancy",
    "Catering Equipment Installation & Maintenance",
    "Catering Equipment Supplying",
    "Catering Equipment Wholesaling",
    "Catering Ex Mobile Vans",
    "Catering Licensed",
    "Catering Unlicensed",
    "CCTV Installation,Service & Repair",
    "Ceramic & Pottery Manufacturing",
    "Ceramics/Pottery Warehouse",
    "Chamber Of Commerce",
    "Charity",
    "Charity Shop",
    "Chartered Surveyor",
    "Chemical Manufacturing",
    "Chemical Wholesaling Ex Toiletries & Cosmetics",
    "Chemist - Dispensing",
    "Child Minding",
    "Childrens Clothing Retailing",
    "Childrens Entertainment",
    "Children's Home",
    "Chiropody",
    "Chiropractor",
    "Chocolate Manufacturing",
    "Church",
    "Civic Trust",
    "Civil Engineering",
    "Civil Engineering Consultancy",
    "Civil/Consultant Engineering",
    "Cladding Contracting",
    "Cleaner",
    "Cleaners - Domestic",
    "Cleaning Contracting",
    "Cleaning Services",
    "Cleaning Services Excl Exterior Of Buildings Blast and Boilers",
    "Clerical Services",
    "Clothing Hiring",
    "Clothing Manufacturing",
    "Clothing Manufacturing Ex Woollens & Hosiery/Leather",
    "Clothing Retailing",
    "Clothing Wholesalers Excluding Leather",
    "Clothing Wholesaling Ex Woollens & Hosiery/Leather",
    "Coach Operator",
    "Coach Operators",
    "Coal Merchant",
    "Coffee And Tea Retailing",
    "Coffee Merchant",
    "Coffee Roasters",
    "Coffee Shop",
    "Commercial Vehicles - Sales/Repair/Service",
    "Communications",
    "Community Action Group",
    "Community Association",
    "Community Care Consultancy",
    "Community Centre",
    "Community Service",
    "Compliance Consultancy",
    "Computer & IT Consultancy",
    "Computer & IT Training",
    "Computer Aided Designer",
    "Computer Consultancy",
    "Computer Hardware Warehouse",
    "Computer Programmer",
    "Computer Service & Repair",
    "Computer Services",
    "Computer Software",
    "Computer Software Developer & Consultancy",
    "Computer Software House",
    "Computers",
    "Computers - Hardware",
    "Computers - Software",
    "Concrete Product Manufacturing",
    "Concrete Products Wholesalers",
    "Confectionery",
    "Confectionery Retailers",
    "Conservation",
    "Construction Industry",
    "Construction Plant Machinery Installation, Service & Repair",
    "Construction Project Manager",
    "Construction Skills Training",
    "Consultancy",
    "Consultant Engineering",
    "Contract Cleaning",
    "Conveyancing",
    "Cosmetics & Toiletries Wholesaling",
    "Couriers - Network",
    "Couriers/Delivery Service",
    "Credit Union",
    "Crematoria",
    "Dairy",
    "Dairy Farming",
    "Dairy Product Manufacturing",
    "Dairy Product Wholesaling",
    "Damp Proofing Contractor",
    "Damp Proofing Service",
    "Data Processor",
    "Day Centre",
    "Debt Collection",
    "Delicatessen",
    "Dental Technician",
    "Dental Technicians",
    "Dentistry",
    "Dermatology",
    "Design",
    "Design And Build",
    "Design Consultancy",
    "Design Engineering",
    "Distillers",
    "Distribution",
    "Doctor",
    "Dog Groomer",
    "Dog Walker",
    "Domestic Appliance Installation, Service & Repair",
    "Domestic Appliance Installation,Service & Repair",
    "Domestic Wheelie Bin Cleaning",
    "Domiciliary Care",
    "Door Manufacturers (Metal)",
    "Double Glazing",
    "Double Glazing Installation, Service & Repair",
    "Double Glazing Installing",
    "Drain Cleaning Contracting",
    "Drama School",
    "Drilling & Boring Contractor",
    "Dry Cleaning",
    "Dry Lining Contractor",
    "E-Cigarette Wholesaling",
    "Ecology",
    "Education",
    "Education - Private",
    "Education Advisory Service",
    "Electric Lighting Wholesaling",
    "Electric Meter Wholesaling",
    "Electric Motor Wholesalers",
    "Electrical  Goods Domestic Wholesaling",
    "Electrical Appliance Manufacturing",
    "Electrical Appliance Servicing & Repair",
    "Electrical Brown Goods Manufacturing",
    "Electrical Component Manufacturing",
    "Electrical Component Wholesaling",
    "Electrical Components Supplier",
    "Electrical Contracting Ex Aerial Erecting",
    "Electrical Contracting Inc Aerial Erecting",
    "Electrical Contractor",
    "Electrical Contractor - Domestic/Small Commercial Only",
    "Electrical Element Manufacturers",
    "Electrical Engineer Installation, Service & Repair",
    "Electrical Engineering & Repair",
    "Electrical Goods Hiring - HI FI Audio TV etc.",
    "Electrical Goods Retailing",
    "Electrical Supplies Wholesaling",
    "Electricity Industry",
    "Electronic Component Manufacturers",
    "Electronic Consultancy",
    "Electronic Engineer Installation, Service & Repair",
    "Electronics",
    "Embroidery Design & Manufacturing Inc Clothing",
    "Employment Agency",
    "Energy Assessor",
    "Energy Assessors",
    "Energy Assessors - Commercial",
    "Energy Assessors - Domestic",
    "Energy Conservation Consultancy",
    "Energy Consultancy",
    "Energy Performance Assessing",
    "Engineering",
    "Engineering Consultancy",
    "Engraving",
    "Entertainment",
    "Environmental Consultancy",
    "Estate Agency",
    "Estate Agency - Residential",
    "Estate Agent",
    "Event Lighting Technician",
    "Event Organiser",
    "Event Organising",
    "Events Decorator",
    "Events Organising",
    "Exhibition Designer",
    "Exhibition Stand Erector",
    "Expanded Metal Manufacturers",
    "Fabric Retailing",
    "Fabrications",
    "Facilities Management",
    "Fancy Goods Wholesaling",
    "Farm Management",
    "Farming",
    "Fashion Designer",
    "Fashion Retailing",
    "Fast Food Retailing",
    "Fence Contractor",
    "Fence Erecting",
    "Fencing & Hoarding Contractor",
    "Fencing Manufacturing",
    "Festival Organiser",
    "Fibre Glass Manufacturing",
    "Films",
    "Finance Broker",
    "Finance Company",
    "Financial Adviser",
    "Financial Advisory Service",
    "Financial Consultancy",
    "Financial Services",
    "Fire Extinguisher Wholesaling",
    "Fire Protection",
    "Fire Protection Consultancy",
    "Fire Safety & Protection Consultancy",
    "Fire Services",
    "Fish (Dead) Wholesalers",
    "Fish And Chip Shop",
    "Fishermen",
    "Fishing",
    "Fishing Tackle Retailing",
    "Fishmonger",
    "Fitted Bathroom Installation",
    "Fitted Furniture Installation",
    "Floor Covering (Wood) Wholesalers",
    "Floor Screeder",
    "Flooring Contractor",
    "Flooring Contractors Warehouses",
    "Florists",
    "Food & Drink Processing Machinery Manufacturing",
    "Food Manufacturing",
    "Food Mixer Wholesalers",
    "Food Production",
    "Food Wholesaling",
    "Footwear & Shoe Wholesaling",
    "Footwear Retailing",
    "Forestry Consultancy",
    "Fork Lift Truck Training Instructors",
    "Freight",
    "French Polishing",
    "Frozen Food Wholesaling",
    "Fuel Distribution",
    "Funeral Director",
    "Furniture (Flat Pack) Retailing",
    "Furniture (Wood, Non Upholstered) Wholesalers",
    "Furniture Assembly & Repair",
    "Furniture Dealing",
    "Furniture Manufacturing",
    "Furniture Repair",
    "Furniture Retailing",
    "Furniture Retailing - Second-hand",
    "Furniture Wholesaling",
    "Galvanising",
    "Gaming & Amusement Machine Installation, Service & Repair",
    "Garage",
    "Garden Centre",
    "Garden Equipment Retailing",
    "Garden Furniture Manufacturing Wood",
    "Garden Services",
    "Gardener",
    "Gas Appliance Manufacturers",
    "General Store",
    "Gentlemens/Business Club",
    "Gift and Fancy Goods Shop",
    "Gift Shop",
    "Glass Manufacturing",
    "Glassware Wholesalers",
    "Golf Club",
    "Golf Equipment Manufacturing Ex Plastic",
    "Golf Equipment Retailing",
    "Golf Professionals Shop",
    "Government - UK",
    "Graphic Arts Materials Wholesalers",
    "Graphic Designer",
    "Greengrocer",
    "Ground Maintenance",
    "Groundsman",
    "Groundwork & Paving Contractor",
    "Groundworker",
    "Guest House - Licensed",
    "Guest House - Unlicensed",
    "Guttering And Fascia Board Installation",
    "Gym & Fitness Instructor",
    "Gymnasium",
    "Haberdashery and Draper",
    "Hair & Beauty Consultancy",
    "Hair And Beauty Salon",
    "Hair Clippers Wholesalers",
    "Hairdresser",
    "Hand Held Power Tool Wholesaling",
    "Hardware Retailing",
    "Haulage Contractor",
    "Health & Safety Advisor",
    "Health & Safety Consultancy",
    "Health Care Private",
    "Health Products Distribution",
    "Heating & Ventilating Contractor",
    "Heating & Ventilating Engineer",
    "Heating Engineers Inc Air Conditioning",
    "Heating Installation, Service & Repair",
    "Holiday Accommodation",
    "Holiday Centre",
    "Home Craft",
    "Home Crafts Costume Jewellery Manufacturing",
    "Home Help Services",
    "Horse Breeding",
    "Horse Dealing",
    "Horticultural Wholesalers",
    "Hotel - Licenced",
    "Hotel - Unlicenced",
    "Hotel Management",
    "Housing Developers",
    "Human Resources Consultancy",
    "Hydraulic Engineer Installation, Service & Repair",
    "Hygiene",
    "Ice Cream Parlour",
    "Ice Cream Vendor",
    "Information Bureau",
    "Information Technology Consultancy",
    "Injection Moulding Manufacturing Plastic",
    "Ink Wholesaling",
    "Inspection Services",
    "Insurance",
    "Insurance Broker",
    "Insurance Claims Management",
    "Insurance Consultancy",
    "Interior Designer",
    "Interior Designers Including Fitting",
    "Internet Consultancy",
    "Investment",
    "Investment Consultancy",
    "Iron And Steel Stockist Warehousing",
    "IT Consultancy",
    "Jewellery Design",
    "Jewellery Designer",
    "Jewellery Retailers",
    "Joiner",
    "Joinery",
    "Joinery Manufacturing",
    "Kitchen Accessories Retailing",
    "Kitchen Equipment Electrical Manufacturing",
    "Kitchen Installation Contractor",
    "Kitchen Manufacturing",
    "Kitchen Unit Wholesaling",
    "Kitchen/Bathroom Unit Showroom",
    "Kitchen/Bedroom Unit Manufacturers",
    "Laboratory",
    "Ladder Manufacturing",
    "Land Agency",
    "Land Surveyor",
    "Landscape Architecture",
    "Landscape Gardener",
    "Landscaper",
    "Language School",
    "Launderette (Attended)",
    "Laundry",
    "Legal Services",
    "Leisure Centre",
    "Licensed Premises",
    "Life Coach",
    "Lighting Equipment Manufacturing",
    "Lighting Retailing",
    "Livestock Auctions",
    "Local Authority - County Council",
    "Local Authority - Town Council",
    "Local Government Authority",
    "Loft Converter",
    "Loft Insulator",
    "Logistics Consultancy",
    "Loss Adjuster",
    "Lubricant Distributor",
    "Machinery Dismantling",
    "Machinery Installation",
    "Machinery Repair And Maintenance",
    "Management Consultancy",
    "Manufacturing",
    "Marina",
    "Marine Consultancy",
    "Marine Engineers",
    "Marine Equipment Installation, Service & Repair",
    "Market Gardening",
    "Market Research Consultancy",
    "Marketing",
    "Marketing Consultancy",
    "Marquee Hire",
    "Meat Processing",
    "Mechanic - Mobile",
    "Mechanics (Not Involved In Motor Trade)",
    "Media Consultancy",
    "Medical Consultancy",
    "Medical Equipment Manufacturing",
    "Medical Equipment Wholesaling",
    "Medical Research",
    "Medical Supply Wholesaling",
    "Metal Casting",
    "Metal Coating",
    "Metal Component Manufacturing",
    "Metal Dealing",
    "Metal Fabricator",
    "Metal Treatment",
    "Metal Wholesaling",
    "Metal Worker",
    "Metalwork Fabrication",
    "Metalwork Machinery Manufacturing",
    "Minibus Operator",
    "Mobile Food",
    "Mobile Shop",
    "Model Manufacturing Wood",
    "Monumental Mason",
    "Monumental Masons Including Building",
    "Mortgage Broker",
    "MOT Test Centre - Private Cars And CVs Up To 7.5 Tonnes",
    "Motor Accessories And Parts Wholesalers",
    "Motor Accessories Manufacturers",
    "Motor Accessory & Part Manufacturing",
    "Motor Accessory & Part Wholesaling Ex Fitting",
    "Motor Bodyshop",
    "Motor Car Manufacturers",
    "Motor Cycle Dealers And Repairers",
    "Motor Dealer",
    "Motor Factor/Parts",
    "Motor Repairers (CVs Over 7.5 Tonnes)",
    "Motor Repairers (Private Cars And CVs Up To 7.5 Tonnes)",
    "Motor Trade",
    "Motor Trade - Vehicles To ABI Group 19/20",
    "Motor Vehicle Customisers",
    "Mould & Tool Manufacturing",
    "Museum",
    "Music Publisher",
    "Music Retailing",
    "Music School",
    "Music Teaching",
    "Musical Instrument Manufacturing & Repair Wood",
    "Musical Instrument Wholesaling",
    "Nail Technician",
    "Newsagents",
    "Night Club",
    "No Code Available",
    "Non-Destructive Testing Service",
    "Novelty/Carnival Goods Retailing",
    "Nursery School",
    "Nursing Home",
    "Occupational Health Consultancy",
    "Off Licence",
    "Office Fitter",
    "Office Furniture Retailing",
    "Office Risk",
    "Office Services",
    "Office Supplies Retailing",
    "Offices",
    "Oil Distributor",
    "Optical Services",
    "Optician",
    "Optometrist",
    "Orthopaedic Equipment Retailers",
    "Outdoor Activity Centre",
    "Packing Case Wholesalers",
    "Paint Sprayer",
    "Painter & Decorator",
    "Painting and Decorating - Commercial",
    "Painting and Decorating - Domestic",
    "Paper & Board Wholesaling",
    "Party Planner",
    "Passenger Transport",
    "Patent/Trademark Agents",
    "Performing Arts",
    "Personal Trainer",
    "Pest & Vermin Controller",
    "Pet Accessory/Food Store",
    "Pet Food Manufacturing",
    "Pet Groomer",
    "Pet Shop",
    "Petrochemical Industry",
    "Petrol Pump & Fuel Dispensing Equipment Installation, Service & Repair",
    "Petrol Station",
    "Photography",
    "Photography - Commercial",
    "Physiotherapy",
    "Picture Framing Shop",
    "Pipe & Tube Manufacturing Plastic",
    "Pizza Delivery",
    "Planning Consultancy",
    "Plant Hire",
    "Plant Nursery",
    "Plant Sales",
    "Plastering Contractor",
    "Plastic Goods Assembly",
    "Plastic Packing Goods Manufacturers",
    "Plastic Products Injection/Power Press",
    "Plastic Sheeting Manufacturing",
    "Plastics Manufacture",
    "Playgroup",
    "Playschools",
    "Plumber",
    "Plumbing - Domestic/Small Commercial Only",
    "Plumbing And Heating Engineer - Domestic/Small Commercial Only",
    "Plumbing And Heating Engineers",
    "Plumbing And Heating Engineers (Ex Air Con) - Domestic/Small Comcl Only",
    "Plumbing Product Wholesaling",
    "Point Of Sale & Display - Design & Manufacture",
    "Political Party",
    "Port Authority",
    "Post Office",
    "Post Office - Sub",
    "Poultry Farm",
    "Power Station",
    "Precision Engineering",
    "Premises Security Installation, Service & Repair",
    "Pressure Washing Contractor",
    "Printers - Electrotypers",
    "Printing",
    "Printing - Lithographic",
    "Printing By Printing Press",
    "Printing Engineering Services",
    "Private Hire",
    "Procurement Consultancy",
    "Professional Association",
    "Professional Cricket Club",
    "Project Manager",
    "Promotional Consultancy",
    "Property Consultancy",
    "Property Developer",
    "Property Investment",
    "Property Letting",
    "Property Maintenance/Repairers",
    "Property Management",
    "Property Owner",
    "Property Ownership - Commercial",
    "Property Ownership - Residential",
    "Property Ownership - Residential And Commercial",
    "Property Services",
    "Public House",
    "Public House Independent",
    "Public House Managed",
    "Public House Tenanted",
    "Public Relations Consultancy",
    "Publisher Other Than Printing",
    "Publishing - Local Press",
    "Publishing Inc Printing",
    "Pump & Pumping Equipment Service & Repair",
    "Pump Installation, Service & Repair",
    "Pump Manufacturing",
    "Quantity Surveyor",
    "Quarry",
    "Railway Engineering",
    "Railway Track Manufacturing",
    "Record CD Cassette And Video/DVD Retailing",
    "Recruitment Agency",
    "Recruitment Consultancy",
    "Recycling",
    "Recycling Metal",
    "Refrigeration Engineer Installation, Service & Repair",
    "Refrigeration Installation,Service & Repair",
    "Refuge",
    "Religion",
    "Removal Contractor",
    "Removal, Packing & Storage",
    "Research Consultancy",
    "Resident Association",
    "Residential Care Home",
    "Residential Family Centre",
    "Restaurant",
    "Restaurant - British",
    "Restaurant - Indian",
    "Restaurant - Licensed",
    "Restaurant - Mexican",
    "Restaurant - Other Asian",
    "Restaurant - Unlicensed",
    "Retailing",
    "Retailing - Mobile",
    "Rifle Club",
    "Risk Management Consultancy",
    "Road Marking",
    "Roller Shutter Door Installation, Service & Repair",
    "Roof Slating/Tiling Contractor",
    "Roof Tiler",
    "Roofer",
    "Roofing Services",
    "Saddlery And Tack Retailing",
    "Safety Consultancy",
    "Safety Equipment Wholesaling",
    "Sale/Service/Repair of Plant and Machinery",
    "Sales Promotion Consultancy",
    "Sales/Service/Repair of New Cars",
    "Sandwich Bar",
    "Sandwich Delivery",
    "Sanitary Equipment Manufacturers",
    "Scaffold Contractor",
    "Scaffolding Erection",
    "School Or Academy",
    "Scientific Instrument Manufacturers",
    "Scientific Research",
    "Scout Group",
    "Scrap Metal Merchant",
    "Security Consultancy",
    "Security Guard",
    "Security Services",
    "Self Drive Hire",
    "Self Storage Warehouse",
    "Sewage Consultancy",
    "Sewing Machine Shop",
    "Shed Manufacturing Wood",
    "Shipping & Forwarding Agent",
    "Shoe Repairing",
    "Shoe Retailing",
    "Shooting/Rifle Club",
    "Shop Fitting",
    "Sightseeing Tour Guide",
    "Sign (Illuminated) Manufacturers",
    "Sign Installation, Service & Repair",
    "Sign Making",
    "Sign Writer - Vehicles Only",
    "Skip Hire",
    "Snooker Club",
    "Social Club",
    "Soft Furnishings Manufacturers Inc. Foam Fillings",
    "Software Consultancy",
    "Software Engineer",
    "Software Engineering",
    "Solar Panel Manufacturing",
    "Solicitor",
    "Solvent Wholesalers",
    "Sound Equipment Installation, Service & Repair",
    "Sports",
    "Sports - Professional",
    "Sports & Personal Trainer",
    "Sports Centre",
    "Sports Club",
    "Sports Club Amateur",
    "Sports Coach",
    "Sports Goods Manufacturing",
    "Sports Goods Retailing",
    "Sports Ground",
    "Sports Promotion",
    "Stables",
    "Stair Lift Installation, Service & Repair",
    "Steel Building Manufacturers Or Erectors",
    "Steel Erection",
    "Steel Industry",
    "Steel Stockholders",
    "Stone Mason",
    "Storage Plant And Tanks and Process Vessels - Warehousing",
    "Street Lighting Installation, Service & Repair",
    "Structural Engineer",
    "Structural Steel Manufacturing",
    "Surfing Club",
    "Surveying",
    "Sweet Shop",
    "Swimming Pool Engineering",
    "Swimming Pool Maintenance",
    "Tailor",
    "Tailor & Outfitter",
    "Take Away Food Retailer",
    "Take Away Food Retailer - Burger Bar",
    "Take Away Food Retailer - Chinese",
    "Take Away Food Retailer - Fried Chicken",
    "Take Away Food Retailer - Other",
    "Tanning Salon",
    "Tax Consultancy",
    "Taxi Operator",
    "Tea Room",
    "Telecommunication Equipment Manufacturing",
    "Telecommunication Equipment Supplier",
    "Telecommunication Equipment Wholesaling",
    "Telecommunications",
    "Telecommunications Engineer",
    "Telemarketing",
    "Tent And Marquee Erection",
    "Textile Manufacturing",
    "Textile Product Manufacturing",
    "Theatre",
    "Theatrical Agency",
    "Tile Wholesaling",
    "Tilers",
    "Timber Importing",
    "Timber Wholesaling",
    "Tobacconist",
    "Tool Retailer",
    "Tour Operator",
    "Tourist Board",
    "Town Planner",
    "Trade Association",
    "Trade Union",
    "Trailer Supplier",
    "Training Advisory Service",
    "Training Consultancy",
    "Translator",
    "Transport - Road",
    "Travel Agency",
    "Tree Surgeon",
    "T-Shirt Printing",
    "Turkey Farming",
    "Tyre  Battery And Exhaust Retailing/Fitters",
    "Tyre & Rubber Recycler",
    "Tyre Supplier And Fitting",
    "Upholsterer",
    "UPVC Window And Door Manufacturers And Installers",
    "Used Car Sales",
    "Utilities Contractor (Gas)",
    "Valuer Real Estate",
    "Vehicle Hire - Self Drive",
    "Vehicle Repair",
    "Vehicle Sales And Repairs (PC And CV Up To 7.5 Tonnes)",
    "Vehicle Servicing And Repairs (PC And CV Up To 7.5 Tonnes)",
    "Vending Machine Installation, Service & Repair Inc Plumbing",
    "Ventilation",
    "Ventilation Installation, Service & Repair",
    "Veterinary",
    "Veterinary Surgeons",
    "Village Hall",
    "Voluntary Organisation",
    "Waste Collector",
    "Waste Disposal",
    "Waste Product Reclamation",
    "Water Industry",
    "Water Sports Centre",
    "Water Treatment Contractor",
    "Water Treatment Plant Installation, Service & Repair",
    "Web Site Designer",
    "Wedding Planner",
    "Welder",
    "Welding & Cutting Machinery Wholesaling",
    "Wheelchair Manufacturing",
    "Wholesalers",
    "Window & Door Installation UPVC",
    "Window Cleaner",
    "Window Manufacturers And Installers (UPVC)",
    "Window Wholesalers (UPVC) Ex Fitting",
    "Wine & Spirit Wholesaling",
    "Wine Making",
    "Wines And Spirits Warehousing",
    "Wooden Finished Goods Wholesalers",
    "Woodworker",
    "Wool And Needlework Shop",
    "Woollen Goods Manufacturing",
    "Working Mens Club",
    "Wrought Iron Fabrication & Installation",
    "Yacht Club",
    "Youth Club"
];