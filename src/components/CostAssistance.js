import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CostAssistance.css';

const CostAssistance = ({
    companyName, setCompanyName,
    employeeName, setEmployeeName,
    serviceDescription, setServiceDescription,
    location, setLocation,
    startDate, setStartDate,
    endDate, setEndDate,
    workingDays, setWorkingDays,
    dailyValue, setDailyValue,
    nif, setNif,
    handleGeneratePDF, calculateWorkingDays
}) => {
    const [customServiceDescription, setCustomServiceDescription] = useState('');
    const [isCustomServiceDescription, setIsCustomServiceDescription] = useState(false);
    const [customDailyValue, setCustomDailyValue] = useState('');
    const [isCustomDailyValue, setIsCustomDailyValue] = useState(false);

    useEffect(() => {
        if (startDate && endDate) {
            calculateWorkingDays(startDate, endDate);
        }
    }, [startDate, endDate, calculateWorkingDays]);

    useEffect(() => {
        if (!serviceDescription) {
            setServiceDescription('Serviço de Consultoria em Informática');
        }
    }, [serviceDescription, setServiceDescription]);

    useEffect(() => {
        if (!dailyValue) {
            setDailyValue('69,19');
        }
    }, [dailyValue, setDailyValue]);

    const handleServiceDescriptionChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            setServiceDescription('');
            setIsCustomServiceDescription(true);
        } else {
            setServiceDescription(value);
            setIsCustomServiceDescription(false);
        }
    };

    const handleCustomServiceDescriptionChange = (e) => {
        const value = e.target.value;
        setCustomServiceDescription(value);
        setServiceDescription(value);
    };

    const handleDailyValueChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            setDailyValue('');
            setIsCustomDailyValue(true);
        } else {
            setDailyValue(value);
            setIsCustomDailyValue(false);
        }
    };

    const handleCustomDailyValueChange = (e) => {
        const value = e.target.value;
        setCustomDailyValue(value);
        setDailyValue(value);
    };

    return (
        <div className="container">
            <div className="header">Mapa das Ajudas de Custo</div>
            <div className="form-container">
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label>Nome da Empresa</label>
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="form-group form-group-half">
                        <label>Nome do Funcionário</label>
                        <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label>Descrição do Serviço</label>
                        <select value={isCustomServiceDescription ? 'custom' : serviceDescription} onChange={handleServiceDescriptionChange}>
                            <option value="Serviço de Consultoria em Informática">Serviço de Consultoria em Informática</option>
                            <option value="custom">Outro</option>
                        </select>
                        {isCustomServiceDescription && (
                            <input
                                type="text"
                                value={customServiceDescription}
                                onChange={handleCustomServiceDescriptionChange}
                                placeholder="Digite a descrição do serviço"
                                style={{ marginTop: '10px' }}
                            />
                        )}
                    </div>
                    <div className="form-group form-group-half">
                        <label>Localidade</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label>Data Início</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
                    </div>
                    <div className="form-group form-group-half">
                        <label>Data Fim</label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="dd/MM/yyyy" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label>Dias Úteis</label>
                        <input type="text" value={workingDays} readOnly />
                    </div>
                    <div className="form-group form-group-half">
                        <label>Valor Diário</label>
                        <select value={isCustomDailyValue ? 'custom' : dailyValue} onChange={handleDailyValueChange}>
                            <option value="69,19">69,19</option>
                            <option value="custom">Outro</option>
                        </select>
                        {isCustomDailyValue && (
                            <input
                                type="text"
                                value={customDailyValue}
                                onChange={handleCustomDailyValueChange}
                                placeholder="Digite o valor diário"
                                style={{ marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group form-group-half">
                        <label>Contribuinte/NIF</label>
                        <input type="text" value={nif} onChange={(e) => setNif(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleGeneratePDF}>Generate PDF</button>
            </div>
        </div>
    );
};

export default CostAssistance;
