import Promise from "bluebird";

const REPORTS = [
	{
		title: "(105) Course Section Sca",
		url: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FPublic&BIP_item=105CourseSectionScan.htm&BIP_rand=3562.366208061576",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_crssectscan.htm&BIP_rand=3467.5653208978474",
		description: "This report gives a list of Courses with their Titles, College, Course Number, with Location (Bldg/Room), Section Number, Meeting days and times, Instructors Names, Course Credit Hours, Max Enrollment, Number of Enrolled students and Available enrollments. It is mainly used to check the Status of a course enrollment and availability, where it is being held (Location); total number of seats seats used and seats available.",
		parameters: ["TERM", "Course COLLEGE", "Subject Code", "Course Number"]
	}, {
		title: "Admitted and (NOT) Registered Report",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_adm_madreg.htm&BIP_rand=4523.1428113766015",
		description: "This report generates a list of applicants for a term, college and applications decisions parameters. Then the registered population is generated and joined with applicant population to determine which student is admitted AND registered or which is admitted BUT Not registered. Fields printed are Application Term; FIDN; Student Name; Admit College;Degree; Major; Concentration/Description; Number of Courses; Attempted Hours; Admit Type; Campus; Admit Status 1, 2 and 3;Fordham Program; Special Program HEOP, DOB;Gender Ethnicity Code;Address; Address Type; Phone Number;Full/Part Time Indicator; Level Code; FordhamEmail Personal1 and Personal2 Emails.",
		parameters: ["\"Report\" (1) Admitted AND Registered and (2)Admitted BUT NOT Registered", "TERM", "COLLEGE", "CAMPUS", "SPECIAL PROGRAM", "FORDHAM PROGRAM", "APPLICATION DECISION"]
	}, {
		title: "Quickie Statistics Report",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_rqust.htm&BIP_rand=2561.2701824866235",
		description: "This report generates a Summary or Detail report of current Attempted Hours based on College, Major, Minor and Concentration. Fields printed are: Term; College;Attribute Code; Major Code; Concentration/Minor/ Withdrawal Reason; Total Attempted Hours; FIDN; \# Of Students; Credit Attempted Hours. SubTotal For Term Status;Total for Conc/Minor;Total For Major; Total for Attribute.  Available parameters are TERM; SORT Option; Summary/Detail Report; COLLEGE; CAMPUS; ATTRIBUTES; DEGREE."
	}, {
		title: "Athlete Full-Time Status",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_rathhrs.htm&BIP_rand=995.6423263065517",
		description: "This report generates a list of Student Athletes for a specific term and the number of credits hours for each student.It is used to track the Athletes to monitor the number of registerd hours to ensure they are meeting the eligibility requirements. Fields printed are: LastName; FirstName; FIDN; Attempted Hours; Current Hours; Course Withdrawal Indicator; Registered Indicator. Available parameters: TERM."
	}, {
		title: "Students Withdrawn from All Courses",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_wdraw_nonreg.htm&BIP_rand=5970.320859923959",
		description: "This report generates a list of Students that have withdrawn from all their courses or were never registered for courses for a selected term. The fields printed are:FIDN; Name; Term;Date Of WithDrawal; College/Description; Campus/Desc;Address; Address Type; Phone Number; Expected Graduation Date. Available parameters: TERM; Campus."
	}, {
		title: "Student Housing Report",
		enrollment: "https://reporting.fordham.edu/ibi_apps/views.bip?BIP_REQUEST_TYPE=BIP_RUN&BIP_folder=IBFS%253A%252FWFC%252FRepository%252FStudent%252FEnrollmentServices&BIP_item=stu_student_housing.htm&BIP_rand=8488.95096918568",
		description: "This report generates a list of students with their room assignments for the Term specified Term. Fields printed are: FIDN; LastName; FirstName; MiddleName; Term; Campus Code; Building Code/Description; Room Number; Rate Code; Room Status; Room BeginDate; Room EndDate; Meal Code; Meal Code Status; Phone Code; Phone Code Status;Area Code; Phone Number; Phone BeginDate; Phone EndDate; UserID; PO Box/APT#; Charges Processed; Assess Needed; Total Days; Fordham Email. Available parameters: TERM; CAMPUS; Other variations of the Housing report."
	}
];

export default {

	add (text) {
		return Promise.delay(300).then(() => {
			let report = {text: text, completed: false};
			REPORTS.push(report);
			return report;
		});
	},

	get () {
		return Promise.delay(500).then(() => REPORTS);
	},

	complete (index) {
		return Promise.delay(300).then(() => {
			REPORTS[index] = Object.assign({}, REPORTS[index], {completed: true});
			return REPORTS[index];
		});
	}
};
