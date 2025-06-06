import { useState, useEffect } from 'react';
import { googleSheetsService, type DailySalesSheetData } from '../services/googleSheetsService';
import { useAuth } from './useAuth';

export function useGoogleSheets() {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Testar conexão com Google Sheets
  useEffect(() => {
    const testConnection = async () => {
      if (!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
        setError('API Key do Google Sheets não configurada');
        return;
      }

      try {
        const connected = await googleSheetsService.testConnection();
        setIsConnected(connected);
        if (!connected) {
          setError('Não foi possível conectar com o Google Sheets');
        }
      } catch (err) {
        setError('Erro ao testar conexão com Google Sheets');
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  // Registrar usuário na planilha
  const registerUser = async (email: string, nome?: string): Promise<boolean> => {
    if (!isConnected) return false;

    setIsLoading(true);
    setError(null);

    try {
      const success = await googleSheetsService.registerUser(email, nome);
      if (!success) {
        setError('Erro ao registrar usuário na planilha');
      }
      return success;
    } catch (err) {
      setError('Erro ao registrar usuário');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar dados de vendas na planilha
  const saveSalesData = async (
    date: string,
    salesData: {
      vendas_realizadas: number;
      investimento: number;
      vendas_agendadas: number;
      lucro_liquido: number;
      margem_lucro: number;
      vendas_pagas: number;
      remarketing: number;
      primeiro_contato: number;
    }
  ): Promise<boolean> => {
    if (!isConnected || !user) return false;

    setIsLoading(true);
    setError(null);

    try {
      const success = await googleSheetsService.saveDailySalesData(
        user.email,
        date,
        salesData
      );
      if (!success) {
        setError('Erro ao salvar dados na planilha');
      }
      return success;
    } catch (err) {
      setError('Erro ao salvar dados');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar dados de vendas da planilha
  const loadSalesData = async (): Promise<DailySalesSheetData[]> => {
    if (!isConnected || !user) return [];

    setIsLoading(true);
    setError(null);

    try {
      const data = await googleSheetsService.loadUserSalesData(user.email);
      return data;
    } catch (err) {
      setError('Erro ao carregar dados da planilha');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isConnected,
    isLoading,
    error,
    registerUser,
    saveSalesData,
    loadSalesData,
  };
}