Started by user serhat a

org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
WorkflowScript: 18: Invalid tool type "sonarQubeScanner". Valid tool types: [ant, hudson.tasks.Ant$AntInstallation, git, hudson.plugins.git.GitTool, gradle, hudson.plugins.gradle.GradleInstallation, jdk, hudson.model.JDK, jgit, org.jenkinsci.plugins.gitclient.JGitTool, jgitapache, org.jenkinsci.plugins.gitclient.JGitApacheTool, maven, hudson.tasks.Maven$MavenInstallation, hudson.plugins.sonar.SonarRunnerInstallation, hudson.plugins.sonar.MsBuildSQRunnerInstallation] @ line 18, column 17.
                   sonarQubeScanner 'sonarQubeScanner'
                   ^

1 error

	at org.codehaus.groovy.control.ErrorCollector.failIfErrors(ErrorCollector.java:309)
	at org.codehaus.groovy.control.CompilationUnit.applyToPrimaryClassNodes(CompilationUnit.java:1107)
	at org.codehaus.groovy.control.CompilationUnit.doPhaseOperation(CompilationUnit.java:624)
	at org.codehaus.groovy.control.CompilationUnit.processPhaseOperations(CompilationUnit.java:602)
	at org.codehaus.groovy.control.CompilationUnit.compile(CompilationUnit.java:579)
	at groovy.lang.GroovyClassLoader.doParseClass(GroovyClassLoader.java:323)
	at groovy.lang.GroovyClassLoader.parseClass(GroovyClassLoader.java:293)
	at PluginClassLoader for script-security//org.jenkinsci.plugins.scriptsecurity.sandbox.groovy.GroovySandbox$Scope.parse(GroovySandbox.java:163)
	at PluginClassLoader for workflow-cps//org.jenkinsci.plugins.workflow.cps.CpsGroovyShell.doParse(CpsGroovyShell.java:190)
	at PluginClassLoader for workflow-cps//org.jenkinsci.plugins.workflow.cps.CpsGroovyShell.reparse(CpsGroovyShell.java:175)
	at PluginClassLoader for workflow-cps//org.jenkinsci.plugins.workflow.cps.CpsFlowExecution.parseScript(CpsFlowExecution.java:652)
	at PluginClassLoader for workflow-cps//org.jenkinsci.plugins.workflow.cps.CpsFlowExecution.start(CpsFlowExecution.java:598)
	at PluginClassLoader for workflow-job//org.jenkinsci.plugins.workflow.job.WorkflowRun.run(WorkflowRun.java:335)
	at hudson.model.ResourceController.execute(ResourceController.java:101)
	at hudson.model.Executor.run(Executor.java:446)
Finished: FAILURE
