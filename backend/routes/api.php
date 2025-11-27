<?php

use App\Http\Controllers\EntesController;
use App\Http\Controllers\IndicadorController;
use App\Http\Controllers\IndicadorGraphicController;
use App\Http\Controllers\PopulacaoController;
use App\Http\Controllers\subfuncaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// routes/api.php
Route::get('/hello', function () {
    return response()->json(['mensagem' => 'Olá do lixo!']);
});

// Grupo de Rotas de Entes (AnosPeriodos, Estados e Municipios)
Route::prefix('entes')->group(function () {

    // Anos e Periodos
    Route::get('/anosPeriodos', [EntesController::class, 'anosPeriodos']);
    Route::get('/buscar/anosPeriodos/{ano}/{periodo}', [EntesController::class, 'buscarAnoPeriodo']);

    // Estados
    Route::get('/estado', [EntesController::class, 'estados']);
    Route::get('/buscar/estado/{codEstado}', [EntesController::class, 'buscarEstado']);

    // Municipios
    Route::get('/municipios', [EntesController::class, 'municipios']);
    Route::get('/buscar/municipio/{codMunicipio}', [EntesController::class, 'buscarMunicipio']);
    Route::get('/estado/{codUf}/municipio', [EntesController::class, 'municipiosPorEstado']);
    Route::get('/municipios/{coMmunicipio}/estado', [EntesController::class, 'getEstadoByMunicipioCod']);

});

// Grupo de Rotas da População (União, Estado e Municipio)
Route::prefix('populacao')->group(function () {

    // População Estadual
    Route::get('/estadual/{coUf}', [PopulacaoController::class, 'estadualPorUf']);
    Route::get('/estadual/{coUf}/{ano}', [PopulacaoController::class, 'estadualPorAno']);
    Route::get('/estadual/crescimento/{coUf}/{anoInicio}/{anoFim}', [PopulacaoController::class, 'crescimentoPopulacaoEstadual']);
    Route::get('/estadual/indicadores/{uf}/{anoInicio}/{anoFinal}', [PopulacaoController::class, 'indicadoresEstadual']);

    // População Municipal
    Route::get('/municipal/{coMunicipio}', [PopulacaoController::class, 'municipalPorCod']);
    Route::get('/municipal/{coMunicipio}/{ano}', [PopulacaoController::class, 'municipalPorAno']);
    Route::get('/municipal/crescimento/{coMunicipio}/{anoInicio}/{anoFim}', [PopulacaoController::class, 'crescimentoPopulacaoMuncipal']);
    Route::get('/municipal/indicadores/{codMunicipio}/{anoInicio}/{anoFinal}', [PopulacaoController::class, 'indicadoresMunicipal']);


    // População União
    Route::get('/uniao', [PopulacaoController::class, 'uniao']);
    Route::get('/uniao/{ano}', [PopulacaoController::class, 'uniaoPorAno']);
    Route::get('/uniao/crescimento/{anoInicio}/{anoFim}', [PopulacaoController::class, 'crescimentoPopulacaoUniao']);
    Route::get('/uniao/indicadores/{anoInicio}/{anoFinal}', [PopulacaoController::class, 'indicadoresUniao']);


});

// Grupo de Rotas da População (Estado, Municipíos, Df e União )
Route::prefix('indicador')->group(function () {

    //Estado
    Route::get('/estadual/{coUf}', [IndicadorController::class, 'estadual']);
    Route::get('/estadual/{coUf}/{ano}', [IndicadorController::class, 'estadualPorAno']);
    Route::get('/estadual/{coUf}/{numeroIndicador}/{ano}', [IndicadorController::class, 'estadualEspecificoPorAno']);

    //Municipíos
    Route::get('/municipal/{coMunicipio}', [IndicadorController::class, 'municipal']);
    Route::get('/municipal/{coMunicipio}/{ano}', [IndicadorController::class, 'municipalPorAno']);
    Route::get('/municipal/{coMunicipio}/{numeroIndicador}/{ano}', [IndicadorController::class, 'municipalEspecificoPorAno']);

    // DF (Distrito Federal)
    Route::get('/df', [IndicadorController::class, 'df']);
    Route::get('/df/{ano}', [IndicadorController::class, 'dfPorAno']);
    Route::get('/df/{numeroIndicador}/{ano}', [IndicadorController::class, 'dfEspecificoPorAno']);

    // União 
    Route::get('/uniao', [IndicadorController::class, 'uniao']);
    Route::get('/uniao/{ano}', [IndicadorController::class, 'uniaoPorAno']);
    Route::get('/uniao/{numeroIndicador}/{ano}', [IndicadorController::class, 'uniaoEspecificoPorAno']);
});


Route::prefix('subfuncao')->group(function () {

    // Estado

    Route::get('/estado', [SubfuncaoController::class, 'allEstado']);
    Route::get('/estado/cod/{coUf}', [SubfuncaoController::class, 'porEstadoCodUf']);
    Route::get('/estado/grupoDescricao', [SubfuncaoController::class, 'grupoDescricaoEstado']);
    Route::get('/estado/cod/{coUf}/{ano}', [SubfuncaoController::class, 'porEstadoEAno']);


    // Município
    Route::get('/municipio', [SubfuncaoController::class, 'allMunicipio']);
    Route::get('/municipio/cod/{coMunicipio}', [SubfuncaoController::class, 'porMunicipioCod']);
    Route::get('/municipio/grupoDescricao', [SubfuncaoController::class, 'grupoDescricaoMunicipio']);
    Route::get('/municipio/cod/{coMunicipio}/{ano}', [SubfuncaoController::class, 'porMunicipioEAno']);

});

Route::prefix('graficos')->group(function () {

    // Composição da Receita (indicador 1.1, 1.2 e 1.6)
    Route::get('/composicao-receita/{tipo}/{codigo}/{ano}', [IndicadorGraphicController::class, 'composicaoReceita']);

    Route::get('/composicao-receita-periodo/{tipo}/{codigo}', [IndicadorGraphicController::class, 'composicaoReceitaPorPeriodo']);

    // Fontes de Saúde (indicador 1.3, 1.4 e 1.5)
    Route::get('/fontes-saude/{tipo}/{codigo}/{ano}', [IndicadorGraphicController::class, 'fontesSaude']);

    // Despesa com Saúde (indicaodr 2.2, 2.3, 2.4, 2.5 e 2.6)
    Route::get('/despesa-saude/{tipo}/{codigo}/{ano}', [IndicadorGraphicController::class, 'despesaSaude']);

    // LC 141 (indicador 3.1 e 3.2)
    Route::get('/lc141/{tipo}/{codigo}/{ano}', [IndicadorGraphicController::class, 'lc141']);

    // Série Temporal (indicador 2.1)
    Route::get('/serie-temporal/{tipo}/{codigo}', [IndicadorGraphicController::class, 'serieTemporal']);
    

   Route::get('/estatisticas/serie/{tipo}/{codigo}', [IndicadorGraphicController::class, 'estatisticasSerieIndicadores']);


});
