import React from "react";

function Policies() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Policies</h2>
        <div className="text-gray-500 text-sm md:text-base">
          Dashboard /<span className="text-gray-700 font-medium">Policies</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-2 md:px-4 border-b">No.</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">
                Policy Name
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">
                Department
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">
                Description
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Created</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">File</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">1</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b>Code of Conduct Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                A code of conduct policy outlines expected ethical behavior,
                standards, and responsibilities within an organization.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b text-green-700 ">
                <a href="/./public/Company-Policies/Code of Conduct Policies.pdf">
                  Download/View
                </a>
              </td>

              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">2</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b> Compliance and Data Protection Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                Compliance and Data Protection ensure adherence to legal
                regulations and safeguard sensitive data from unauthorized
                access or misuse.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Compliance and Data Protection Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">3</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b> Confidentially Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                Confidentiality Policy safeguards sensitive information by
                restricting access and ensuring its secure handling.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Confidentially Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">4</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b> Disciplinary Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                Disciplinary Policy outlines the procedures and actions for
                addressing employee misconduct or policy violations.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Disciplinary Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">5</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b>General Employment Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                General Employment Policy defines the fundamental guidelines and
                expectations for the employer-employee relationship and
                workplace conduct.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/General Employment Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">6</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b>Leaves Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                Leaves Policy outlines the rules and procedures for availing
                various types of employee leave, ensuring work-life balance and
                organizational needs.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Leaves Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">7</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b>Policy on Prevention of Sexual Harassment (POSH)</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                The POSH policy ensures a safe and respectful workplace by
                preventing, addressing, and resolving incidents of sexual
                harassment.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Policy on Prevention of Sexual Harassment (POSH).pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">8</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b>Probation and Training Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                The Probation and Training Policies outline the probationary
                period expectations and provide guidelines for employee skill
                development and training.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Probation and Training Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">9</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b> Property and Asset Responsibility Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                The Property and Asset Responsibility Policy defines employee
                obligations for the care, use, and protection of company
                property and assets.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Property and Asset Responsibility Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">10</td>
              <td className="py-2 px-2 md:px-4 border-b">
                <b> Termination Policy</b>
              </td>
              <td className="py-2 px-2 md:px-4 border-b">All Departments</td>
              <td className="py-2 px-2 md:px-4 border-b">
                The Termination Policy outlines the procedures and conditions
                for ending employment, including resignation, dismissal, and
                retirement.
              </td>
              <td className="py-2 px-2 md:px-4 border-b">14th October 2024</td>
              <td className="py-2 px-2 md:px-4 border-b  text-green-700 ">
                <a href="/./public/Company-Policies/Termination Policies.pdf">
                  Download/View
                </a>
              </td>
              {/* <Action /> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Policies;
