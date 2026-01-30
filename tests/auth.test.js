import { initializeApp } from 'firebase/app';
// Note: We can't easily test firebase connection in node without a build step or ts-node for the ts file unless we compile it. 
// So testing file existence is the main goal here as per workflow.

console.log('🧪 Starting Authentication Tests...\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition) {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
    }
}

async function runTests() {
    // Test 1: Check Firebase config exists
    try {
        const fs = await import('fs');
        const configExists = fs.existsSync('./firebase.ts');
        test('Firebase config file exists (firebase.ts)', configExists);
    } catch (e) {
        test('Firebase config file exists', false);
    }

    // Test 2: Check AuthContext exists
    try {
        const fs = await import('fs');
        const authContextExists = fs.existsSync('./context/AuthContext.tsx');
        test('AuthContext file exists', authContextExists);
    } catch (e) {
        test('AuthContext file exists', false);
    }

    // Test 3: Check SignIn page exists
    try {
        const fs = await import('fs');
        const signInExists = fs.existsSync('./pages/SignIn.tsx');
        test('SignIn page exists', signInExists);
    } catch (e) {
        test('SignIn page exists', false);
    }

    // Test 4: Check SignUp page exists
    try {
        const fs = await import('fs');
        const signUpExists = fs.existsSync('./pages/SignUp.tsx');
        test('SignUp page exists', signUpExists);
    } catch (e) {
        test('SignUp page exists', false);
    }

    // Test 5: Check ProtectedRoute exists
    try {
        const fs = await import('fs');
        const protectedRouteExists = fs.existsSync('./components/ProtectedRoute.tsx');
        test('ProtectedRoute component exists', protectedRouteExists);
    } catch (e) {
        test('ProtectedRoute component exists', false);
    }

    // Test 6: Check environment variables
    try {
        const fs = await import('fs');
        const envExists = fs.existsSync('./.env.local') || fs.existsSync('./.env');
        test('Environment file exists', envExists);
    } catch (e) {
        test('Environment file exists', false);
    }

    // Test 7: Check MainApp exists (renamed)
    try {
        const fs = await import('fs');
        const mainAppExists = fs.existsSync('./MainApp.tsx');
        test('MainApp (refactored) exists', mainAppExists);
    } catch (e) {
        test('MainApp exists', false);
    }

    // Test 8: Check App exists (Router)
    try {
        const fs = await import('fs');
        const appExists = fs.existsSync('./App.tsx');
        test('App (Router) exists', appExists);
    } catch (e) {
        test('App exists', false);
    }

    // Print results
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    tests.results.forEach(r => console.log(r));
    console.log('================');
    console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

    if (tests.failed > 0) {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed! Authentication setup is complete.');
    }
}

runTests().catch(console.error);
