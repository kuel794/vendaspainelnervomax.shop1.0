import { useState, useEffect } from 'react';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const GoogleSheetsStatus = () => {
  const { isConnected, isLoading, error } = useGoogleSheets();
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = () => {
    if (isLoading) {
      return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
    }
    if (error) {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    if (isConnected) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Conectando...';
    if (error) return 'Erro na conexão';
    if (isConnected) return 'Conectado';
    return 'Desconectado';
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-blue-600 dark:text-blue-400';
    if (error) return 'text-red-600 dark:text-red-400';
    if (isConnected) return 'text-green-600 dark:text-green-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            Google Sheets: {getStatusText()}
          </span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showDetails ? 'Ocultar' : 'Detalhes'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Status:</strong> {isConnected ? 'Sincronização ativa' : 'Sincronização desabilitada'}</p>
            <p><strong>Planilha:</strong> NERVOMAX Dashboard</p>
            {error && (
              <p className="text-red-600 dark:text-red-400">
                <strong>Erro:</strong> {error}
              </p>
            )}
            {isConnected && (
              <p className="text-green-600 dark:text-green-400">
                ✓ Dados sendo salvos automaticamente na planilha
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSheetsStatus;