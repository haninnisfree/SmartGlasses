// ===== 유틸리티 함수들 =====

// 현재 선택된 폴더 정보
let currentFolder = null;

// 선택된 문서 관리
let selectedDocuments = new Set(); // 선택된 문서 ID들

// ===== 문서 선택 관리 함수들 =====

// 문서 선택/해제 토글
function toggleDocumentSelection(fileId) {
    const checkbox = document.getElementById(`doc-${fileId}`);
    const pileChart = checkbox.closest('.pile-chart');
    
    if (checkbox.checked) {
        selectedDocuments.add(fileId);
        pileChart.classList.add('selected');
    } else {
        selectedDocuments.delete(fileId);
        pileChart.classList.remove('selected');
    }
    
    updateSelectionStatus();
}

// 모든 문서 선택
function selectAllDocuments() {
    const checkboxes = document.querySelectorAll('.document-checkbox');
    checkboxes.forEach(checkbox => {
        const fileId = checkbox.getAttribute('data-file-id');
        checkbox.checked = true;
        selectedDocuments.add(fileId);
        checkbox.closest('.pile-chart').classList.add('selected');
    });
    updateSelectionStatus();
}

// 모든 문서 선택 해제
function clearAllSelections() {
    const checkboxes = document.querySelectorAll('.document-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.pile-chart').classList.remove('selected');
    });
    selectedDocuments.clear();
    updateSelectionStatus();
}

// 선택 상태 업데이트
function updateSelectionStatus() {
    console.log(`📋 선택된 문서: ${selectedDocuments.size}개`, Array.from(selectedDocuments));
    
    // 선택된 문서 수 표시 (필요시 UI 업데이트)
    const statusElement = document.querySelector('.selection-status');
    if (statusElement) {
        statusElement.textContent = `${selectedDocuments.size}개 문서 선택됨`;
    }
}

// 선택된 문서 목록 반환
function getSelectedDocuments() {
    return Array.from(selectedDocuments);
}

// ===== 알림 및 로딩 관련 함수들 =====

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.api-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `api-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 애니메이션으로 표시
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// 로딩 표시 함수
function showLoading(target = null) {
    const loader = document.createElement('div');
    loader.className = 'api-loader';
    loader.innerHTML = `
        <div class="api-loader-content">
            <div class="api-loader-spinner"></div>
            데이터 로딩 중...
        </div>
    `;
    
    if (target) {
        target.appendChild(loader);
    }
    
    return loader;
}

// 로딩 제거 함수
function hideLoading(target = null) {
    const loaders = target ? 
        target.querySelectorAll('.api-loader') : 
        document.querySelectorAll('.api-loader');
    loaders.forEach(loader => loader.remove());
}

// ===== 폴더 및 문서 관련 유틸리티 =====

// 선택된 폴더 정보 로드
function loadSelectedFolder() {
    try {
        const savedFolder = localStorage.getItem('selectedFolder');
        if (savedFolder) {
            currentFolder = JSON.parse(savedFolder);
            console.log('선택된 폴더:', currentFolder);
            
            // 페이지 제목 업데이트
            const titleElement = document.querySelector('.main-title');
            if (titleElement && currentFolder.title) {
                titleElement.textContent = currentFolder.title;
            }
            
            // 메모 모듈 새로고침
            if (typeof refreshMemoModulesOnFolderChange === 'function') {
                refreshMemoModulesOnFolderChange();
            }
            
            // 추천 모듈 새로고침
            if (typeof refreshRecommendationModulesOnFolderChange === 'function') {
                refreshRecommendationModulesOnFolderChange();
            }
        } else {
            console.warn('선택된 폴더 정보가 없습니다.');
            // home.html로 리다이렉트
            window.location.href = 'home.html';
        }
    } catch (error) {
        console.error('폴더 정보 로드 실패:', error);
        window.location.href = 'home.html';
    }
}

// 파일 타입별 정보 반환
function getFileTypeInfo(fileType) {
    const type = fileType.toLowerCase();
    
    switch (type) {
        case 'pdf':
            return {
                icon: `<svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                       </svg>`,
                badgeClass: 'pdf'
            };
        case 'doc':
        case 'docx':
            return {
                icon: `<svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="8" y1="13" x2="16" y2="13"></line>
                        <line x1="8" y1="17" x2="12" y2="17"></line>
                        </svg>`,
                badgeClass: 'docx'
            };
        default:
            return {
                icon: `<svg class="file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        </svg>`,
                badgeClass: 'pdf'
            };
    }
}

// 파일 크기 포맷팅 (글자수 기반)
function formatFileSize(charCount) {
    if (charCount < 1000) {
        return `${charCount}자`;
    } else if (charCount < 10000) {
        return `${(charCount / 1000).toFixed(1)}K자`;
    } else {
        return `${Math.round(charCount / 1000)}K자`;
    }
}

// 날짜 포맷팅
function formatDocumentDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return '어제';
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks}주 전`;
    } else {
        const months = Math.floor(diffDays / 30);
        return `${months}개월 전`;
    }
}

// ===== 문서 렌더링 함수 =====

// 문서 목록 렌더링
function renderDocuments(documentGroups) {
    const pileContainer = document.querySelector('.pile-container');
    if (!pileContainer) return;
    
    if (documentGroups.length === 0) {
        pileContainer.innerHTML = `
            <div class="empty-documents-container">
                <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 1 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                이 폴더에는 아직 문서가 없습니다.<br>
                <small class="empty-details">문서를 업로드해보세요.</small>
            </div>
        `;
        return;
    }
    
    let documentsHTML = '';
    
    documentGroups.forEach((docGroup, index) => {
        // 파일 타입에 따른 아이콘 및 배지 스타일 결정
        const fileInfo = getFileTypeInfo(docGroup.file_type);
        
        // 날짜 포맷팅
        const createdDate = new Date(docGroup.created_at);
        const formattedDate = formatDocumentDate(createdDate);
        const formattedSize = formatFileSize(docGroup.file_size || docGroup.page_count);
        
        // 파일명 처리 - Unknown Document인 경우 생성날짜로 대체
        let displayFileName = docGroup.file_name;
        if (displayFileName === 'Unknown Document' || !displayFileName || displayFileName.trim() === '') {
            const dateForFileName = createdDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit', 
                day: '2-digit'
            }).replace(/\./g, '-').replace(/-$/g, '');
            displayFileName = `문서_${dateForFileName}`;
        }
        
        documentsHTML += `
            <div class="pile-item">
                <div class="pile-chart" data-file-id="${docGroup.file_id}">
                    <div class="file-row">
                        <div class="file-info">
                            <div class="file-checkbox">
                                <input type="checkbox" 
                                       class="document-checkbox" 
                                       id="doc-${docGroup.file_id}"
                                       data-file-id="${docGroup.file_id}">
                                <label for="doc-${docGroup.file_id}" class="checkbox-label"></label>
                            </div>
                            <div class="file-icon-container">
                                ${fileInfo.icon}
                            </div>
                            <div class="file-details">
                                <div class="file-name">${displayFileName}</div>
                                <div class="file-source">${docGroup.page_count}페이지</div>
                            </div>
                        </div>
                        
                        <div class="file-size">${formattedSize}</div>
                        <div class="file-date">${formattedDate}</div>
                        
                        <div class="file-type">
                            <span class="type-badge ${fileInfo.badgeClass}">${docGroup.file_type.toUpperCase()}</span>
                        </div>
                        
                        <div class="file-actions">
                            <button class="action-btn download-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7,10 12,15 17,10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                            <button class="action-btn more-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </button>
                            <button class="action-btn expand-btn">
                                <svg class="expand-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="pile-low-text" data-file-id="${docGroup.file_id}">
                    <div class="content-container">
                        <div class="content-header">
                            <div class="content-actions">
                                <button class="preview-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    미리보기
                                </button>
                                <button class="full-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                                    </svg>
                                    전체보기
                                </button>
                            </div>
                        </div>
                        
                        <div class="content-display">
                            <div class="text-content-area">
                                <div class="content-text" data-raw-content="${encodeURIComponent(docGroup.low_text || '문서 내용을 불러오는 중...')}" style="font-size: calc(1em * var(--font-scale)); line-height: calc(1.5 * var(--font-scale));">${docGroup.low_text || '문서 내용을 불러오는 중...'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    pileContainer.innerHTML = documentsHTML;
    
    // 선택 상태 업데이트
    updateSelectionStatus();
}

// ===== 기본 문서 액션 함수들 =====

// 문서 다운로드
function downloadDocument(fileId) {
    console.log('문서 다운로드:', fileId);
    // TODO: 다운로드 기능 구현
    showNotification('다운로드 기능은 곧 구현될 예정입니다.', 'info');
}

// 더 많은 옵션 표시
function showMoreOptions(fileId) {
    console.log('문서 옵션:', fileId);
    // TODO: 옵션 메뉴 구현
    showNotification('옵션 메뉴는 곧 구현될 예정입니다.', 'info');
}

// 문서 미리보기
function previewDocument(fileId) {
    console.log('문서 미리보기:', fileId);
    // TODO: 미리보기 모달 구현
    showNotification('미리보기 기능은 곧 구현될 예정입니다.', 'info');
}

// ===== 네비게이션 함수들 =====

// 네비게이션 함수 추가
function navigateToHome() {
    window.location.href = 'home.html';
}

function togglePileContent(button) {
    // 버튼이 속한 pile-item 찾기
    const pileItem = button.closest('.pile-item');
    const pileChart = pileItem.querySelector('.pile-chart');
    const pileLowText = pileItem.querySelector('.pile-low-text');
    const expandArrow = button.querySelector('.expand-arrow');
    
    // 드롭다운 토글
    pileLowText.classList.toggle('expanded');
    expandArrow.classList.toggle('rotated');
    
    // pile-chart 스타일 조정 (드롭다운이 열렸을 때 하단 보더 제거)
    if (pileLowText.classList.contains('expanded')) {
        pileChart.style.borderBottom = 'none';
    } else {
        pileChart.style.borderBottom = '1px solid #f1f5f9';
    }
}

function previousPage() {
    // 이전 페이지 로직 (백엔드 연동 시 구현)
    console.log('이전 페이지로 이동');
}

function nextPage() {
    // 다음 페이지 로직 (백엔드 연동 시 구현)
    console.log('다음 페이지로 이동');
}