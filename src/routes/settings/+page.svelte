<script lang="ts">
	import Header from '$components/Header.svelte';
	import Layout from '$components/Layout.svelte';
	import { dict } from '$stores/dict';
	import { config } from '$stores/config';
	import Input from '$components/Modal/Input.svelte';
	import Option from '$components/Modal/Option.svelte';
	import Select from '$components/Modal/Select.svelte';
	import Section from '$components/Settings/Section.svelte';
	import SubSection from '$components/Settings/SubSection.svelte';
	import KeyboardShortcuts from '$components/Settings/KeyboardShortcuts.svelte';
	import WordsPhrasesWindows from '$components/Settings/WordsPhrasesWindows.svelte';
	import Button from '$components/Modal/Button.svelte';
</script>

<Header />

<Layout>
	<div class="text-4xl px-4 h-16 border-b border-b-neutral-600 flex items-center">
		<span>{$dict.navigation.settings}</span>
	</div>

	<div class="fixed overflow-hidden overflow-y-scroll w-full h-[calc(100%-64px-48px)] flex flex-col gap-4 px-4 py-2">
		<Section>
			<span slot="title">{$dict.settings.logs.this.name}</span>
			<span slot="description">{$dict.settings.logs.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.logs.debug.name}</span>
					<span slot="description">{$dict.settings.logs.debug.description}</span>

					<Select
						slot="content"
						bind:value="{$config.logs.debug}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.logs.saveToFile.name}</span>
					<span slot="description">{$dict.settings.logs.saveToFile.description}</span>

					<Select
						slot="content"
						bind:value="{$config.logs.saveToFile}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.input.this.name}</span>
			<span slot="description">{$dict.settings.input.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.input.holdToActivate.name}</span>
					<span slot="description">{$dict.settings.input.holdToActivate.description}</span>

					<Select
						slot="content"
						bind:value="{$config.input.holdToActivate}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.input.keyboardShortcuts.name}</span>
					<span slot="description">{$dict.settings.input.keyboardShortcuts.description}</span>

					<KeyboardShortcuts
						slot="content"
						bind:keyboardShortcuts="{$config.input.keyboardShortcuts}"
					/>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.input.autoRelease.name}</span>
					<span slot="description">{$dict.settings.input.autoRelease.description}</span>

					<Select
						slot="content"
						bind:value="{$config.input.autoRelease.enabled}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.input.releaseTime.name}</span>
					<span slot="description">{$dict.settings.input.releaseTime.description}</span>

					<Input
						slot="content"
						bind:value="{$config.input.autoRelease.releaseTime}"
						type="number"
						text="{$dict.time.normal.s}"
						textPos="after"
						disabled="{!$config.input.autoRelease.enabled}"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.output.this.name}</span>
			<span slot="description">{$dict.settings.output.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.output.partial.name}</span>
					<span slot="description">{$dict.settings.output.partial.description}</span>

					<Select
						slot="content"
						bind:value="{$config.output.partial}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.output.animated.name}</span>
					<span slot="description">{$dict.settings.output.animated.description}</span>

					<Select
						slot="content"
						bind:value="{$config.output.animated}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.output.typingDelay.name}</span>
					<span slot="description">{$dict.settings.output.typingDelay.description}</span>

					<Input
						bind:value="{$config.output.typingDelay}"
						slot="content"
						type="number"
						text="{$dict.time.normal.ms}"
						textPos="after"
						disabled="{!$config.output.animated}"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.feedback.this.name}</span>
			<span slot="description">{$dict.settings.feedback.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.feedback.sounds.name}</span>
					<span slot="description">{$dict.settings.feedback.sounds.description}</span>

					<div slot="content">
						<Select bind:value="{$config.feedback.sounds.enabled}">
							<Option value="{true}">{$dict.states.enable}</Option>
							<Option value="{false}">{$dict.states.disable}</Option>
						</Select>
					</div>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.feedback.sounds.audioMode.name}</span>
					<span slot="description">{$dict.settings.feedback.sounds.audioMode.description}</span>

					<div slot="content">
						<Select
							bind:value="{$config.feedback.sounds.mode}"
							disabled="{!$config.feedback.sounds.enabled}"
						>
							<Option value="default">{$dict.states.default}</Option>
							<Option value="custom">{$dict.states.custom}</Option>
						</Select>
					</div>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.feedback.sounds.audioVolume.name}</span>
					<span slot="description">{$dict.settings.feedback.sounds.audioVolume.description}</span>

					<div slot="content">
						<div class="flex gap-1">
							<input
								class="w-32"
								type="range"
								min="0"
								max="1"
								step="0.01"
								bind:value="{$config.feedback.sounds.volume}"
								disabled="{!$config.feedback.sounds.enabled}"
							/>
							<span>{Math.round($config.feedback.sounds.volume * 100)}%</span>
						</div>
					</div>
				</SubSection>

				{#if $config.feedback.sounds.mode === 'custom' && $config.feedback.sounds.enabled}
					<SubSection>
						<span slot="title">{$dict.settings.feedback.sounds.customAudioFile.name}</span>
						<span slot="description">{$dict.settings.feedback.sounds.customAudioFile.description}</span>

						<div slot="content">
							<div class="flex gap-1">
								<Button
									on:click="{function () {
										window.electron.send('electron', { event: 'selectAudioFile', data: null });
									}}"
								>
									{$dict.settings.feedback.sounds.customAudioFile.select}
								</Button>
								{#if $config.feedback.sounds.file.filepath !== null}
									<Button
										on:click="{function () {
											$config.feedback.sounds.file = {
												filepath: null,
												basepath: null,
												basename: null,
											};
										}}"
										btnType="cancel"
									>
										{$dict.buttons.reset}
									</Button>
									<Button
										on:click="{function () {
											window.electron.send('electron', { event: 'playTest', data: null });
										}}"
									>
										Test
									</Button>
								{/if}
							</div>
							<span>{$dict.settings.feedback.sounds.customAudioFile.selected}: <span class="font-light">{$config.feedback.sounds.file.basename ? $config.feedback.sounds.file.basename : $dict.states.none}</span></span>
						</div>
					</SubSection>
				{/if}

				<SubSection>
					<span slot="title">{$dict.settings.feedback.speech.name}</span>
					<span slot="description">{$dict.settings.feedback.speech.description}</span>

					<Select
						slot="content"
						bind:value="{$config.feedback.speech.enabled}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.feedback.volume.name}</span>
					<span slot="description">{$dict.settings.feedback.volume.description}</span>

					<div
						slot="content"
						class="flex gap-1"
					>
						<input
							class="w-32"
							type="range"
							min="0"
							max="1"
							step="0.01"
							bind:value="{$config.feedback.speech.volume}"
							disabled="{!$config.feedback.speech.enabled}"
						/>
						<span>{Math.round($config.feedback.speech.volume * 100)}%</span>
					</div>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.feedback.language.name}</span>
					<span slot="description">{$dict.settings.feedback.language.description}</span>

					<Select
						slot="content"
						bind:value="{$config.feedback.language}"
					>
						<Option value="hu">Hungarian</Option>
						<Option value="en">English</Option>
					</Select>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.speechRecognition.this.name}</span>
			<span slot="description">{$dict.settings.speechRecognition.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.speechRecognition.language.name}</span>
					<span slot="description">{$dict.settings.speechRecognition.language.description}</span>

					<Select
						slot="content"
						bind:value="{$config.speechRecognition.language}"
					>
						<Option value="hu-HU">Hungarian</Option>
						<Option value="en-US">English (USA)</Option>
						<Option value="en-GB">English (UK)</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.speechRecognition.customWordsAndPhrases.name}</span>
					<span slot="description">{$dict.settings.speechRecognition.customWordsAndPhrases.description}</span>

					<WordsPhrasesWindows
						slot="content"
						bind:items="{$config.speechRecognition.customWordsAndPhrases}"
						itemName="customWordsAndPhrases"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.replacers.this.name}</span>
			<span slot="description">{$dict.settings.replacers.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.replacers.punctuationMarks.name}</span>
					<span slot="description">{$dict.settings.replacers.punctuationMarks.description}</span>

					<Select
						slot="content"
						bind:value="{$config.replacers.punctuationMarks}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.replacers.gameChatPrefixes.name}</span>
					<span slot="description">{$dict.settings.replacers.gameChatPrefixes.description}</span>

					<Select
						slot="content"
						bind:value="{$config.replacers.gameChatPrefixes}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.windowAllowList.this.name}</span>
			<span slot="description">{$dict.settings.windowAllowList.this.description}</span>

			<div slot="content">
				<SubSection>
					<Select
						slot="content"
						bind:value="{$config.windowAllowList.enabled}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.windowAllowList.windows.name}</span>
					<span slot="description">{$dict.settings.windowAllowList.windows.description}</span>

					<WordsPhrasesWindows
						disabled="{!$config.windowAllowList.enabled}"
						disabledText="{'(' + $dict.settings.windowAllowList.this.name + ' ' + $dict.states.disabled.toLowerCase() + ')'}"
						slot="content"
						bind:items="{$config.windowAllowList.windows}"
						itemName="windows"
					/>
				</SubSection>
			</div>
		</Section>

		<Section>
			<span slot="title">{$dict.settings.commands.this.name}</span>
			<span slot="description">{$dict.settings.commands.this.description}</span>

			<div
				slot="content"
				class="relative"
			>
				<SubSection>
					<Select
						slot="content"
						bind:value="{$config.commands.enabled}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.commands.prefix.name}</span>
					<span slot="description">{$dict.settings.commands.prefix.description}</span>

					<Input
						slot="content"
						bind:value="{$config.commands.prefix}"
						disabled="{!$config.commands.enabled}"
					/>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.commands.splitter.name}</span>
					<span slot="description">{$dict.settings.commands.splitter.description}</span>

					<Input
						slot="content"
						bind:value="{$config.commands.splitter}"
						disabled="{!$config.commands.enabled}"
					/>
				</SubSection>
			</div>
		</Section>

		<Section useSplitterLine="{false}">
			<span slot="title">{$dict.settings.others.this.name}</span>
			<span slot="description">{$dict.settings.others.this.description}</span>

			<div slot="content">
				<SubSection>
					<span slot="title">{$dict.settings.others.mtaConsoleInputMode.name}</span>
					<span slot="description">{$dict.settings.others.mtaConsoleInputMode.description}</span>

					<Select
						slot="content"
						bind:value="{$config.others.mtaConsoleInputMode}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>

				<SubSection>
					<span slot="title">{$dict.settings.others.showActiveButtons.name}</span>
					<span slot="description">{$dict.settings.others.showActiveButtons.description}</span>

					<Select
						slot="content"
						bind:value="{$config.others.showActiveButtons}"
					>
						<Option value="{true}">{$dict.states.enable}</Option>
						<Option value="{false}">{$dict.states.disable}</Option>
					</Select>
				</SubSection>
			</div>
		</Section>
	</div>
</Layout>
