
function viewDesc(level) {
    document.getElementById('DescriptionContainer').style.display = 'block';

    document.getElementById('GOLDDesc').style.display = 'none';
    document.getElementById('SILVERDesc').style.display = 'none';
    document.getElementById('BRONZEDesc').style.display = 'none';

    if (level == 'GOLD') {
        document.getElementById('GOLDDesc').style.display = 'block';
    } else if (level == 'SILVER') {
        document.getElementById('SILVERDesc').style.display = 'block';
    } else if (level == 'BRONZE') {
        document.getElementById('BRONZEDesc').style.display = 'block';
    }
    Desc(level);
}

function CloseDesc() {
    document.getElementById('DescriptionContainer').style.display = 'none';
}

function Desc(level) {
    var fileURL;
    if (level == 'GOLD') {
        fileURL = '/GOLD.txt';
    } else if (level == 'SILVER') {
        fileURL = '/SILVER.txt';
    } else if (level == 'BRONZE') {
        fileURL = '/BRONZE.txt';
    }
    fetch(fileURL)
        .then(response => response.text())
        .then(text => {
            var formattedText = text.replace(/\n/g, '<br>');
            formattedText = formatText(formattedText);
            document.getElementById(level + 'Desc').innerHTML = formattedText;
        });
}

function formatText(text) {
    var boldPattern = /\[(.*?)\]/g;
    return text.replace(boldPattern, '<strong>$1</strong>');
}



function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

document.getElementById('GeneratePDF').addEventListener('click', function () {
    const pdfFilePath = 'H&S QG - Description Comp Table.pdf';
    const link = document.createElement('a');
    link.href = pdfFilePath;
    link.download = 'Services-Comparison-Table.pdf';
    link.click();
});

function generatePDF() {
    const content = document.getElementById('QuoteResults');

    const contentClone = content.cloneNode(true);

    const elementsToStyle = contentClone.querySelectorAll('.Gelement-to-style, .Selement-to-style, .Belement-to-style');
    elementsToStyle.forEach(element => {
        element.style.color = 'black';
        element.style.width = '150px';
        element.style.height = '260px';
        element.style.display = 'inline-block'; 
        element.style.verticalAlign = 'top'; 
        element.style.marginRight = '10px'; 
        element.style.fontFamily = 'Inter';
    });

    const GelementsToStyle = contentClone.querySelectorAll('.Gelement-to-style');
    GelementsToStyle.forEach(element => {
        element.style.border = '5px solid gold';

    });
    const SelementsToStyle = contentClone.querySelectorAll('.Selement-to-style');
    SelementsToStyle.forEach(element => {
        element.style.border = '5px solid silver';
    });
    const BelementsToStyle = contentClone.querySelectorAll('.Belement-to-style');
    BelementsToStyle.forEach(element => {
        element.style.border = '5px solid #CD7F32';

    });

    const hiddenElements = contentClone.querySelectorAll('.hidden-element');
    hiddenElements.forEach(element => {
        element.style.display = 'none';
    }); 

    const companyName = document.getElementById('companyName').value;
    const companyPostcode = document.getElementById('companyPostcode').value;
    const companyType = document.getElementById('companyType').value;
    const numEmployees = document.getElementById('numEmployees').value;

    const companyInfoElement = document.createElement('div');
    companyInfoElement.innerHTML = `
        <img src="logo-red.jpg" alt="Company Logo" style="width: 40%;"></br></br></br>
        <p><b>Company Name:</b> ${companyName}</p>
        <p><b>Company Postcode:</b> ${companyPostcode}</p>
        <p><b>Company's Trade Type:</b> ${companyType}</p>
        <p><b>Number of Employees:</b> ${numEmployees}</p></br>
        <p><b><span class="summ-head">Your Health and Safety services </span> <span class="summary-heading">Quotes:</span></b></p>
    `;

    companyInfoElement.style.marginBottom = '10px'; 
    companyInfoElement.style.marginTop = '-100px'; 
    companyInfoElement.style.marginLeft = '50px';
    companyInfoElement.style.textAlign = 'left';

    contentClone.insertBefore(companyInfoElement, contentClone.firstChild);


    html2pdf().from(contentClone).save('Quotes.pdf');
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
    const isValidPostcode1 = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/.test(postcodeInput);
    const isValidPostcode = /^(CF|NP|SA|HR|LD|GL|BS)\d/.test(postcodeInput);

    if (isCompanyTypeRestricted && (!isValidPostcode || !isValidPostcode1)) {
        document.getElementById("RestrictedPostcode").style.display = "block";
        document.getElementById("RestrictedIndustry").style.display = "block";
        document.getElementById("QuoteResults").style.display = "none";
        return;
    }

    if (isCompanyTypeRestricted) {
        document.getElementById("RestrictedIndustry").style.display = "block";
        document.getElementById("QuoteResults").style.display = "none";
    } else {
        document.getElementById("RestrictedIndustry").style.display = "none";
    }

    if (!isValidPostcode1) {
        document.getElementById("InvalidPostcode").style.display = "block";
        document.getElementById("QuoteResults").style.display = "none";

    } else {
        document.getElementById("InvalidPostcode").style.display = "none";
    }

    if (!isValidPostcode && !isValidPostcode1) {
        document.getElementById("RestrictedPostcode").style.display = "none";
        document.getElementById("QuoteResults").style.display = "none";
    } else {
        document.getElementById("RestrictedPostcode").style.display = "block";
    }

    if (isValidPostcode) {
        document.getElementById("RestrictedPostcode").style.display = "none";
    }

    if (!isCompanyTypeRestricted && isValidPostcode && isValidPostcode1) {
        calculateQuote();
    }
}


var goldMonthlyQuote;
var silverMonthlyQuote;
var bronzeMonthlyQuote;
var goldAnnualQuote;
var silverAnnualQuote;
var bronzeAnnualQuote;

function loadJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

function calculateQuote() {
    document.getElementById('Edit').style.display = 'block';
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


    loadJSON('quotes.json', function (response) {
        var data = JSON.parse(response);

        for (var range of data.employeeRanges) {
            if (numEmployees >= range.minEmployees && numEmployees <= range.maxEmployees) {
                document.getElementById("QuoteResults").style.display = "block";
                document.getElementById("ExtraHelp").style.display = "block";
                scrollToElement("ExtraHelp");
                document.body.style.overflow = "auto";

                document.getElementById("goldMonthlyQuoteResult").innerText = "Monthly Quote: " + "\u00A3" + range.goldMonthlyQuote;
                document.getElementById("goldAnnualQuoteResult").innerText = "Annual Quote: " + "\u00A3" + range.goldAnnualQuote;
                document.getElementById("silverMonthlyQuoteResult").innerText = "Monthly Quote: " + "\u00A3" + range.silverMonthlyQuote;
                document.getElementById("silverAnnualQuoteResult").innerText = "Annual Quote: " + "\u00A3" + range.silverAnnualQuote;
                document.getElementById("bronzeMonthlyQuoteResult").innerText = "Monthly Quote: " + "\u00A3" + range.bronzeMonthlyQuote;
                document.getElementById("bronzeAnnualQuoteResult").innerText = "Annual Quote: " + "\u00A3" + range.bronzeAnnualQuote;
                document.getElementById("AltQuoteResults").style.display = "none";
                return;
            }
        }

        document.getElementById("QuoteResults").style.display = "none";
        document.getElementById("AltQuoteResults").style.display = "block";
    });
}

function Edit() {
    document.getElementById("CalculateQuote").style.display = "block";

    document.getElementById("BRONZE").style.border = "none";
    document.getElementById("GOLD").style.border = "none";
    document.getElementById("SILVER").style.border = "none";

    scrollToElement("Logo");

}


function Exit() {
    window.location.reload()
}


const restrictedCompanyTypes = ["construction industry", "construction plant machinery installation, service & repair", "construction project manager", "construction skills training"]; // add here


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