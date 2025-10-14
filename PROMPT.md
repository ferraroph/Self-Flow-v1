# Protocolo de Continuidade do PRD

1. {{analise}}Analise o PRD do início ao fim: `prd.md`
2. {{marcados}} Verifique se a última fase ou conjunto de task marcado foram realmente implementados

**IF** "marcados" = implementado, **THEN** execute passo 3
**IF** "marcados" = não implementado, **THEN** execute passo 4

3. {{naomarcados}} Verifique se a próxima fase ou conjunto de task que apareçe como não marcado realmente ainda não foram implementados

**IF** "marcados" = não implementado, **THEN** execute a fase/conjunto de task
**IF** "naomarcados" = implementado, **THEN** marque o que foi implementado e execute o protocolo de continuidade novamente (Considerando que agora, o PRD está correto, após sua marcação)