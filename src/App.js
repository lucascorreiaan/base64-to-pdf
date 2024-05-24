import React, { useState } from 'react';
import CostAssistance from './components/CostAssistance';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const App = () => {
    const [companyName, setCompanyName] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [workingDays, setWorkingDays] = useState(0);
    const [dailyValue, setDailyValue] = useState('');
    const [nif, setNif] = useState('');
    const [workingDates, setWorkingDates] = useState([]);

    const calculateWorkingDays = (start, end) => {
        const feriadosPortugal = [
            '2024-01-01', '2024-04-25', '2024-05-01', '2024-05-30', '2024-06-10',
            '2024-08-15', '2024-10-05', '2024-11-01', '2024-12-01', '2024-12-08', '2024-12-25'
        ];

        let count = 0;
        let currentDate = new Date(start);
        const endDt = new Date(end);
        const workingDatesArray = [];

        while (currentDate <= endDt) {
            const dayOfWeek = currentDate.getDay();
            const formattedDate = currentDate.toISOString().split('T')[0];
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !feriadosPortugal.includes(formattedDate)) {
                count++;
                workingDatesArray.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setWorkingDays(count);
        setWorkingDates(workingDatesArray);
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Cabeçalho estilizado
        doc.setFillColor(60, 60, 60);
        doc.rect(0, 0, 210, 30, 'F');
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text(companyName, 105, 10, null, null, 'center');
        doc.text('Mapa das Ajudas de Custo', 105, 25, null, null, 'center');

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text('Nome do Funcionário:', 20, 50);
        doc.text('Serviço:', 20, 60);
        doc.text('Localidade:', 20, 70);
        doc.text('Período:', 20, 80);
        doc.text('Dias Úteis:', 20, 90);
        doc.text('Valor Diário:', 20, 100);
        doc.text('Contribuinte/NIF:', 20, 110);

        doc.setFont("helvetica", "normal");
        doc.text(employeeName, 70, 50);
        doc.text(serviceDescription, 70, 60);
        doc.text(location, 70, 70);
        doc.text(`${startDate.toISOString().split('T')[0]} a ${endDate.toISOString().split('T')[0]}`, 70, 80);
        doc.text(`${workingDays}`, 70, 90);
        doc.text(dailyValue, 70, 100);
        doc.text(nif, 70, 110);

        const tableData = workingDates.map(date => [
            date.toISOString().split('T')[0],
            serviceDescription,
            location,
            date.toISOString().split('T')[0],
            '09:00',
            date.toISOString().split('T')[0],
            '18:00',
            `${dailyValue} €`
        ]);

        doc.autoTable({
            head: [['Dia', 'Serviço', 'Localidade', 'Início', 'Hora Início', 'Fim', 'Hora Fim', 'Valor']],
            body: tableData,
            startY: 120,
            theme: 'grid',
            styles: { fillColor: [240, 240, 240] },
            headStyles: { fillColor: [60, 60, 60] },
            columnStyles: {
                7: { halign: 'right' }
            }
        });

        const totalValue = (workingDays * parseFloat(dailyValue.replace(',', '.'))).toFixed(2);

        doc.text('RESUMO', 105, doc.lastAutoTable.finalY + 10, null, null, 'center');
        doc.autoTable({
            head: [['DIAS', 'VALOR DIARIO', 'TOTAL']],
            body: [
                [workingDays, `${dailyValue} €`, `${totalValue} €`]
            ],
            startY: doc.lastAutoTable.finalY + 20,
            theme: 'grid',
            styles: { fillColor: [240, 240, 240] },
            headStyles: { fillColor: [60, 60, 60] }
        });

        doc.text('Decreto-Lei nº 106/98 de 24/04/98', 105, doc.lastAutoTable.finalY + 20, null, null, 'center');

        doc.text('Funcionário:', 20, doc.lastAutoTable.finalY + 50);
        doc.text('_____________________________', 20, doc.lastAutoTable.finalY + 60);
        doc.text('Gerência:', 140, doc.lastAutoTable.finalY + 50);
        doc.text('_____________________________', 140, doc.lastAutoTable.finalY + 60);

        doc.save('Mapa_de_Ajuda_de_Custos.pdf');
    };

    return (
        <div>
            <CostAssistance
                companyName={companyName}
                setCompanyName={setCompanyName}
                employeeName={employeeName}
                setEmployeeName={setEmployeeName}
                serviceDescription={serviceDescription}
                setServiceDescription={setServiceDescription}
                location={location}
                setLocation={setLocation}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                workingDays={workingDays}
                dailyValue={dailyValue}
                setDailyValue={setDailyValue}
                nif={nif}
                setNif={setNif}
                handleGeneratePDF={handleGeneratePDF}
                calculateWorkingDays={calculateWorkingDays}
            />
        </div>
    );
};

export default App;
