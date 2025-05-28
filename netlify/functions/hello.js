exports.handler = async (event, context) => {
  // Разрешаем CORS для всех доменов
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json',
  };

  // Обработка preflight запросов
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { httpMethod, path, queryStringParameters, body } = event;
    
    // Логирование для отладки
    console.log('Function called:', { httpMethod, path, queryStringParameters });

    // Простой ответ для тестирования
    const response = {
      message: 'Beauty Track Hub API работает!',
      timestamp: new Date().toISOString(),
      method: httpMethod,
      path: path,
      query: queryStringParameters,
      environment: process.env.NETLIFY_DEV ? 'development' : 'production'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response, null, 2),
    };
  } catch (error) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
    };
  }
}; 